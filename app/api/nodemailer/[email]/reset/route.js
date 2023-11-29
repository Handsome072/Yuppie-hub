import { nodeMailer } from "@/components/nodemailer";
import { resetPassword } from "@/components/nodemailer/resetPassword";
import {
  maxAgeErrorToken,
  maxResetPassword,
  resetPasswordTokenName,
} from "@/lib/constants";
import { emailController } from "@/lib/controllers/email.controller";
import connectToMongo from "@/lib/db";
import { addNewToken, createToken } from "@/lib/jwt";
import UserModel from "@/lib/models/user.model";
import { isEmpty } from "@/lib/utils/isEmpty";
import { NextResponse } from "next/server";
export const GET = async (req, { params }) => {
  try {
    let token;
    let user;
    let infos;
    let res;
    const { email } = params;

    // error invalid email
    if (!emailController(email)) {
      infos = { email, invalidEmailError: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(JSON.stringify({ token }, { status: 400 }));
    }

    await connectToMongo();
    user = await UserModel.findOne({ email });

    //  error user not found
    if (isEmpty(user)) {
      infos = { email, userNotFound: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(JSON.stringify({ token }, { status: 404 }));
    }

    // error not active
    if (!user.isActive) {
      infos = {
        email,
        login: true,
        notActive: true,
      };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token, notActive: true }, { status: 403 }) // Changed status to 403 for invalid password
      );
    }

    infos = {
      resetPassword: true,
      email,
      id: user._id,
    };
    token = createToken(infos, maxResetPassword);

    // sending reset password email
    res = await nodeMailer({
      to: user.email,
      subject: "Réinitialisation de mot de passe",
      ...resetPassword({
        email,
        userType: user.userType,
        lang: user.lang,
        token,
      }),
    });

    // error while sending email
    if (!isEmpty(res?.error)) {
      infos = { email, error: res.error, sendEmailError: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(JSON.stringify({ token }, { status: 400 }));
    }

    user = await addNewToken({
      email,
      token,
      id: user._id,
      tokenName: resetPasswordTokenName,
    });

    infos = {
      emailSent: true,
      email,
      id: user._id,
    };
    token = createToken(infos, maxAgeErrorToken);

    return new NextResponse(JSON.stringify({ token }, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }, { status: 500 })
    );
  }
};
