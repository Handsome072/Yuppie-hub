import UserModel from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { addNewToken, createToken } from "@/lib/jwt";
import { isEmpty } from "@/lib/utils/isEmpty";
import { authTokenName, cookieName, maxAge } from "@/constants";
import { emailController } from "@/lib/controllers/email.controller";

export const POST = async (req) => {
  try {
    let token = null;
    let infos = null;
    let max = 60 * 60;
    const body = await req.json();
    if (isEmpty(body)) {
      return new NextResponse(
        JSON.stringify({ error: "Data required." }, { status: 400 })
      );
    }
    if (!emailController(body.email)) {
      infos = { ...body, invalidLoginEmail: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 401 }) // Changed status to 401 for invalid email
      );
    }
    const user = await UserModel.findOne({ email: body.email });
    if (isEmpty(user)) {
      infos = { ...body, ukEmail: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 404 }) // Changed status to 404 for user not found
      );
    }
    const validUser = await bcrypt.compare(body.password, user.password);
    if (!validUser) {
      infos = { ...body, invalidLoginPassword: true };
      token = createToken(infosos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 403 }) // Changed status to 403 for invalid password
      );
    }
    infos = {
      id: user._doc._id,
      userType: user._doc.userType,
      isAdmin: user._doc.isAdmin,
      lang: user._doc.lang,
    };
    const accessToken = createToken(infos);
    await addNewToken({
      id: user._doc._id,
      token: accessToken,
      tokenName: authTokenName,
      infos: body?.infos,
      persist: body?.persist,
    }).catch((error) => console.log(error));
    const resLogin = new NextResponse(
      JSON.stringify({ id: user._doc._id }, { status: 200 })
    );
    resLogin.cookies.set(cookieName, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: body?.persist ? null : maxAge,
    });
    return resLogin;
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }, { status: 500 })
    );
  }
};
