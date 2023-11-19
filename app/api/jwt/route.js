import { authTokenName, cookieName } from "@/lib/constants";
import connectToMongo from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import UserModel from "@/lib/models/user.model";
import { isEmpty } from "@/lib/utils/isEmpty";
import { NextResponse } from "next/server";
export const GET = async (req) => {
  try {
    const token = req.cookies.get(cookieName);
    if (isEmpty(token?.value)) {
      return new NextResponse(
        JSON.stringify(
          { error: "No token", token, cookie: req.cookies },
          { status: 400 }
        )
      );
    }
    const verify = verifyToken(token.value);
    if (isEmpty(verify.infos)) {
      const res = new NextResponse(
        JSON.stringify({ error: "Invalid Token" }, { status: 403 })
      );
      res.cookies.set(cookieName, "", { maxAge: -1 });
      return res;
    }
    await connectToMongo();
    const { id } = verify.infos;
    const user = await UserModel.findById(id);
    if (isEmpty(user)) {
      const res = new NextResponse(
        JSON.stringify({ error: "User not found" }, { status: 404 })
      );
      res.cookies.set(cookieName, "", { maxAge: -1 });
      return res;
    }
    const { tokens } = user._doc;
    const validToken = tokens.find(
      (t) => t.value === token.value && t.obj === authTokenName
    );
    if (isEmpty(validToken)) {
      const res = new NextResponse(
        JSON.stringify({ error: "Invalid Token" }, { status: 403 })
      );
      res.cookies.set(cookieName, "", { maxAge: -1 });
      return res;
    }
    return new NextResponse(
      JSON.stringify({ token: verify.infos }, { status: 200 })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }, { status: 500 })
    );
  }
};
