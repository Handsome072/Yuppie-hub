import UserModel from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { addNewToken, createToken } from "@/lib/jwt";
import { isEmpty } from "@/lib/utils/isEmpty";
import {
  authTokenName,
  cookieName,
  maxAgeAuthToken,
  maxAgeErrorToken,
} from "@/lib/constants";
import { emailController } from "@/lib/controllers/email.controller";
import connectToMongo from "@/lib/db";

export const POST = async (req) => {
  try {
    let user;
    let token;
    let infos;

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

    // error invalid email
    await connectToMongo();
    user = await UserModel.findOne({ email: body.email });

    if (isEmpty(user) || !emailController(body.email)) {
      const { password, ...infosToReturn } = body;
      infos = { ...infosToReturn, login: true, invalidLoginEmailError: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 404 }) // Changed status to 404 for user not found
      );
    }

    const validUser = await bcrypt.compare(body.password, user.password);

    // error incorrect password
    if (!validUser) {
      const { password, ...infosToReturn } = body;
      infos = {
        ...infosToReturn,
        login: true,
        invalidLoginPasswordError: true,
      };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 403 }) // Changed status to 403 for invalid password
      );
    }

    // error invalid userType
    if (user.userType !== body.userType) {
      const { password, ...infosToReturn } = body;
      infos = {
        ...infosToReturn,
        login: true,
        invalidLoginUserTypeError: true,
      };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 403 }) // Changed status to 403 for invalid password
      );
    }

    // error not active
    if (!user.isActive) {
      const { password, ...infosToReturn } = body;
      infos = {
        ...infosToReturn,
        login: true,
        notActive: true,
      };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 403 }) // Changed status to 403 for invalid password
      );
    }

    infos = {
      id: user._id,
      userType: user.userType,
      isAdmin: user.isAdmin,
      lang: user.lang,
    };
    const authToken = createToken(infos, maxAgeAuthToken);

    // add new auth token
    const { tokenAdded } = await addNewToken({
      id: user._id,
      token: authToken,
      tokenName: authTokenName,
      persist: body.remember,
    });

    if (!tokenAdded) {
      const { password, ...infosToReturn } = body;

      infos = { ...infosToReturn, login: true, failToAddToken: true };
      token = createToken(infos, maxAgeErrorToken);
      return new NextResponse(
        JSON.stringify({ error: token }, { status: 500 })
      );
    }

    const { password, tokens, isAdmin, image, ...userInfos } = Object.assign(
      {},
      user.toJSON()
    );
    const res = new NextResponse(
      JSON.stringify(
        {
          user: { ...userInfos, image: user.image[0] || "" },
          token: authToken,
        },
        { status: 200 }
      )
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };
    if (body.remember) {
      options.maxAge = maxAgeAuthToken;
    }

    // adding cookies
    res.cookies.set(cookieName, authToken, options);
    return res;
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }, { status: 500 })
    );
  }
};
