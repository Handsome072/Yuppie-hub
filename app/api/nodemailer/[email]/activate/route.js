import { nodeMailer } from "@/components/nodemailer";
import { activateUserCompte } from "@/components/nodemailer/activateUserCompte";
import {
  activateUserCompteTokenName,
  maxAgeErrorToken,
  maxResetPassword,
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
    if (isEmpty(email) || !emailController(email)) {
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

    infos = {
      activateUserCompte: true,
      id: user._id,
      email,
    };
    token = createToken(infos, maxResetPassword);

    // sending reset password email
    res = await nodeMailer({
      to: email,
      subject: "Activation de compte",
      ...activateUserCompte({
        userType: user.userType,
        lang: user.lang,
        email,
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
      id: user._id,
      tokenName: activateUserCompteTokenName,
      email,
      token,
    });

    infos = {
      emailSent: true,
      id: user._id,
      email,
    };
    token = createToken(infos, maxAgeErrorToken);

    return new NextResponse(JSON.stringify({ token }, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }, { status: 500 })
    );
  }
};
