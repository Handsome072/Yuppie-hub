import { nodeMailer } from "@/components/nodemailer";
import { resetPassword } from "@/components/nodemailer/resetPassword";
import { maxResetPassword, resetPasswordTokenName } from "@/constants";
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
    const max = 60 * 60;
    if (!emailController(email)) {
      infos = { email, invalidResetEmailError: true };
      token = createToken(infos, max);
      return new NextResponse(JSON.stringify({ token }, { status: 400 }));
    }
    await connectToMongo();
    user = await UserModel.findOne({ email });
    if (isEmpty(user)) {
      infos = { email, userNotFound: true };
      token = createToken(infos, max);
      return new NextResponse(JSON.stringify({ token }, { status: 400 }));
    }
    infos = {
      resetPassword: true,
      email: user.email,
      id: user._id,
    };
    token = createToken(infos, maxResetPassword);
    res = await nodeMailer({
      to: user.email,
      subject: "Réinitialisation de mot de passe",
      ...resetPassword({
        email: user.email,
        userType: user.userType,
        lang: user.lang,
        token,
      }),
    });

    if (!isEmpty(res?.error)) {
      infos = { email, sendEmailError: true };
      token = createToken(infos, max);
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
      email: user.email,
      id: user._id,
    };
    token = createToken(infos, max);
    return new NextResponse(JSON.stringify({ token }, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }, { status: 500 })
    );
  }
};
