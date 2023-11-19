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
import { emailController } from "@/lib/controllers/email.controller";
import connectToMongo from "@/lib/db";
import { maxAgeAuthToken, maxAgeErrorToken } from "@/lib/constants";
export const POST = async (req) => {
  try {
    let token = null;
    let infos = null;
    let user = null;
    let username = null;

    const body = await req.json();

    const { minNameRegisterError, maxNameRegisterError } = validateName(
      body.name
    );
    const { minUsernameRegisterError, maxUsernameRegisterError } =
      validateUsername(body.username);
    const { minPasswordRegisterError } = validatePassword(body.password);

    if (
      isEmpty(body) ||
      isEmpty(body?.name) ||
      isEmpty(body?.username) ||
      isEmpty(body?.email) ||
      isEmpty(body?.password) ||
      isEmpty(body?.userType) ||
      isEmpty(body?.remember)
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Data required" }, { status: 400 })
      );
    }

    // error name < 3
    if (minNameRegisterError) {
      infos = { ...body, register: true, minNameRegisterError: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }

    // error name > 50
    if (maxNameRegisterError) {
      infos = { ...body, register: true, maxNameRegisterError: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }

    // error username < 3
    if (minUsernameRegisterError) {
      infos = { ...body, register: true, minUsernameRegisterError: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }

    // error username > 50
    if (maxUsernameRegisterError) {
      infos = { ...body, register: true, maxUsernameRegisterError: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }

    // error email invalid
    if (!emailController(body.email)) {
      infos = { ...body, register: true, invalidRegisterEmailError: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }

    // error password < 6
    if (minPasswordRegisterError) {
      infos = { ...body, register: true, minPasswordRegisterError: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }

    await connectToMongo();
    const verifyExistUser = await UserModel.findOne({ email: body.email });

    // error email already exist
    if (!isEmpty(verifyExistUser)) {
      infos = { ...body, register: true, alreadyExistRegisterEmailError: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }

    // capitalize username
    username = body.username.charAt(0).toUpperCase() + body.username.slice(1);

    user = await UserModel.create({
      email: body.email,
      password: body.password,
      name: body.name,
      username,
      userType: body.userType,
      persist: body.remember,
    });

    // error user not created
    if (isEmpty(user)) {
      infos = { ...body, register: true, failToCreateNewUser: true };
      token = createToken(infos, maxAgeErrorToken);
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
    token = createToken(infos, maxAgeAuthToken);

    // sending registration email confirmation
    const res = await nodeMailer({
      to: user.email,
      subject: "Inscription réussie",
      ...generateEmail({
        name: user.name,
        username: user.username,
        userType: user.userType,
        lang: user.lang,
        token,
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
