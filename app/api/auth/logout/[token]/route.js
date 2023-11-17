import { authTokenName, cookieName } from "@/constants";
import connectToMongo from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import UserModel from "@/lib/models/user.model";
import { isEmpty } from "@/lib/utils/isEmpty";
import { NextResponse } from "next/server";
export const GET = async (req, { params }) => {
  try {
    let user;
    const { token } = params;
    // const token = req.cookies.get(cookieName);
    if (isEmpty(token)) {
      return new NextResponse(
        JSON.stringify({ error: "No token" }, { status: 200 })
      );
    }
    const verify = verifyToken(token);
    if (isEmpty(verify.infos)) {
      const res = new NextResponse(
        JSON.stringify({ error: "Invalid token" }, { status: 200 })
      );
      res.cookies.set(cookieName, "", { maxAge: -1 });
      return res;
    }
    await connectToMongo();
    const { id } = verify.infos;
    user = await UserModel.findById(id);
    if (!user) {
      const res = new NextResponse(
        JSON.stringify({ error: "User not found" }, { status: 400 })
      );
      res.cookies.set(cookieName, "", { maxAge: -1 });
      return res;
    }
    const existAuthToken = user.tokens.find(
      (t) => t.obj === authTokenName && t.value === token
    );
    if (isEmpty(existAuthToken)) {
      const res = new NextResponse(
        JSON.stringify({ error: "Invalid token" }, { status: 403 })
      );
      res.cookies.set(cookieName, "", { maxAge: -1 });
      return res;
    }
    user = await UserModel.findByIdAndUpdate(
      id,
      {
        $pull: { tokens: existAuthToken },
      },
      { new: true }
    );
    const res = new NextResponse(
      JSON.stringify({ message: "Déconnecté avec succès" }, { status: 403 })
    );
    res.cookies.set(cookieName, "", { maxAge: -1 });
    return res;
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }, { status: 500 })
    );
  }
};
