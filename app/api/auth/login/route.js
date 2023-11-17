import UserModel from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { addNewToken, createToken } from "@/lib/jwt";
import { isEmpty } from "@/lib/utils/isEmpty";
import { authTokenName, cookieName, maxAge } from "@/constants";
import { emailController } from "@/lib/controllers/email.controller";
import connectToMongo from "@/lib/db";

export const POST = async (req) => {
  try {
    let token = null;
    let infos = null;
    let max = 60 * 60;
    const body = await req.json();
    if (
      isEmpty(body) ||
      isEmpty(body?.email) ||
      isEmpty(body?.password) ||
      isEmpty(body?.remember) ||
      isEmpty(body?.userType)
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Data required." }, { status: 400 })
      );
    }
    if (!emailController(body.email)) {
      infos = { ...body, login: true, invalidLoginEmailError: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 401 }) // Changed status to 401 for invalid email
      );
    }
    await connectToMongo();
    const user = await UserModel.findOne({ email: body.email });
    if (isEmpty(user)) {
      infos = { ...body, login: true, ukEmailLoginError: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 404 }) // Changed status to 404 for user not found
      );
    }
    const validUser = await bcrypt.compare(body.password, user.password);
    if (!validUser) {
      infos = { ...body, login: true, invalidLoginPasswordError: true };
      token = createToken(infos, max);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 403 }) // Changed status to 403 for invalid password
      );
    }
    if (user.userType !== body.userType) {
      infos = { ...body, login: true, invalidLoginUserTypeError: true };
      token = createToken(infos, max);
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
      persist: body.remember,
    });
    const { password, tokens, isAdmin, ...userInfos } = Object.assign(
      {},
      user.toJSON()
    );
    const res = new NextResponse(
      JSON.stringify(
        { user: { ...userInfos }, token: accessToken },
        { status: 200 }
      )
    );
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };
    if (body.remember) {
      options.maxAge = maxAge;
    }
    res.cookies.set(cookieName, accessToken, options);
    return res;
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }, { status: 500 })
    );
  }
};
