import {
  validatePassword,
  validateName,
  validateUsername,
} from "@/lib/controllers/auth.controller";
import UserModel from "@/lib/models/user.model";
import { isEmpty } from "@/lib/utils/isEmpty";
import { NextResponse } from "next/server";
import { createToken } from "@/lib/jwt";
import { nodeMailer } from "@/components/nodemailer";
import { generateEmail } from "@/components/nodemailer/inscription";
import path from "path";
import convertImageToBase64 from "@/lib/controllers/nodemailer";
import { emailController } from "@/lib/controllers/email.controller";
import connectToMongo from "@/lib/db";
export const POST = async (req) => {
  try {
    let token = null;
    let infos = null;
    let user = null;
    let username = null;
    let max = 60 * 60;
    const body = await req.json();
    const { minNameRegisterError, maxNameRegisterError } = validateName(
      body.name
    );
    const { minUsernameRegisterError, maxUsernameRegisterError } =
      validateUsername(body.username);
    const { minPasswordRegisterError } = validatePassword(body.password);
    if (isEmpty(body)) {
      return new NextResponse(
        JSON.stringify({ error: "Data required" }, { status: 400 })
      );
    }
    if (minNameRegisterError) {
      infos = { ...body, minNameRegisterError: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }
    if (maxNameRegisterError) {
      infos = { ...body, maxNameRegisterError: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }
    if (minUsernameRegisterError) {
      infos = { ...body, minUsernameRegisterError: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }
    if (maxUsernameRegisterError) {
      infos = { ...body, maxUsernameRegisterError: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }
    if (!emailController(body.email)) {
      infos = { ...body, invalidRegisterEmailError: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }
    if (minPasswordRegisterError) {
      infos = { ...body, minPasswordRegisterError: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }
    await connectToMongo();
    const verifyExistUser = await UserModel.findOne({ email: body.email });
    if (!isEmpty(verifyExistUser)) {
      infos = { ...body, alreadyExistRegisterEmailError: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }
    username = body.username.charAt(0).toUpperCase() + body.username.slice(1);
    user = await UserModel.create({
      email: body.email,
      password: body.password,
      name: body.name,
      username,
      userType: body.userType,
    });
    if (isEmpty(user)) {
      infos = { ...body, failToCreateNewUser: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify(
          {
            error: token,
          },
          { status: 500 }
        )
      );
    }
    infos = {
      newUser: true,
      email: user.email,
      id: user._id,
    };
    token = createToken(infos, max);
    const res = await nodeMailer({
      to: user.email,
      subject: "Inscription réussie",
      ...generateEmail({
        name: user.name,
        username: user.username,
        userType: user.userType,
        link: token,
      }),
    });
    if (!isEmpty(res?.error)) {
      return new NextResponse(
        JSON.stringify({ token, sendEmailError: true }, { status: 400 })
      );
    }
    return new NextResponse(JSON.stringify({ token }, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }, { status: 500 })
    );
  }
};

export const GET = async () => {
  try {
    const imagePath = path.join("assets", "logo.png");
    const src = await convertImageToBase64(imagePath);
    return new NextResponse(JSON.stringify({ src }, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }, { status: 200 })
    );
  }
};
