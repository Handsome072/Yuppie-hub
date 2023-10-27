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
export const POST = async (req) => {
  try {
    let token = null;
    let infos = null;
    let username = null;
    let max = 60 * 60;
    const body = await req.json();
    const { nameError } = validateName(body.name);
    const { usernameError } = validateUsername(body.username);
    const { passWordError } = validatePassword(body.password);
    if (isEmpty(body)) {
      return new NextResponse(
        JSON.stringify({ error: "Data required" }, { status: 400 })
      );
    }
    if (nameError) {
      return new NextResponse(
        JSON.stringify({ error: nameError }, { status: 400 })
      );
    }
    if (usernameError && !isEmpty(usernameError)) {
      return new NextResponse(
        JSON.stringify({ error: usernameError }, { status: 400 })
      );
    }
    if (!emailController(body.email)) {
      infos = { ...body, invalidEmail: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }
    if (passWordError) {
      return new NextResponse(
        JSON.stringify({ error: passWordError }, { status: 400 })
      );
    }
    const verifyExistUser = await UserModel.findOne({ email: body.email });
    if (!isEmpty(verifyExistUser)) {
      infos = { ...body, emailExist: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 400 })
      );
    }
    username = body.username.charAt(0).toUpperCase() + body.username.slice(1);
    const user = await UserModel.create({
      email: body.email,
      password: body.password,
      name: body.name,
      username,
      userType: body.userType,
    });
    if (!user) {
      return new NextResponse(
        JSON.stringify(
          {
            error:
              "Une erreur est survenue lors de la création de l'utilisateur",
          },
          { status: 500 }
        )
      );
    }

    const res = await nodeMailer({
      to: user.email,
      subject: "Inscription réussie",
      ...generateEmail({
        name: user.name,
        username: user.username,
        userType: user.userType,
      }),
    });
    if (!isEmpty(res?.error)) {
      console.log("confirm register with email", res.error);
      return new NextResponse(
        JSON.stringify(
          { sendEmailError: "Erreur d'envoi de l'email" },
          { status: 400 }
        )
      );
    }
    infos = { newUser: true, email: user.email, id: user._id };
    token = createToken(infos, max);
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
