import { authTokenName, cookieName } from "@/lib/constants";
import connectToMongo from "@/lib/db";
import { removeExistToken, verifyExistToken, verifyToken } from "@/lib/jwt";
import UserModel from "@/lib/models/user.model";
import { isEmpty } from "@/lib/utils/isEmpty";
import { NextResponse, userAgent } from "next/server";
export const GET = async (req, { params }) => {
  try {
    let user;
    let res;
    const { token } = params;

    if (isEmpty(token)) {
      return new NextResponse(
        JSON.stringify({ error: "No token" }, { status: 200 })
      );
    }

    const verify = verifyToken(token);

    if (isEmpty(verify.infos)) {
      res = new NextResponse(
        JSON.stringify({ error: "Invalid token" }, { status: 200 })
      );
      res.cookies.set(cookieName, "", { maxAge: -1 });
      return res;
    }

    await connectToMongo();
    const { id } = verify.infos;
    user = await UserModel.findById(id);

    if (isEmpty(user)) {
      res = new NextResponse(
        JSON.stringify({ userNotFound: "User not found" }, { status: 400 })
      );
      res.cookies.set(cookieName, "", { maxAge: -1 });
      return res;
    }

    const { existToken } = await verifyExistToken({
      token,
      id,
      tokenName: authTokenName,
    });

    if (isEmpty(existToken)) {
      res = new NextResponse(
        JSON.stringify({ error: "Invalid token" }, { status: 403 })
      );
      res.cookies.set(cookieName, "", { maxAge: -1 });
      return res;
    }

    const { tokenRemoved } = await removeExistToken({ id, token: existToken });

    if (!tokenRemoved) {
      res = new NextResponse(
        JSON.stringify({ error: "Failed to remove token" }, { status: 403 })
      );
      res.cookies.set(cookieName, "", { maxAge: -1 });
      return res;
    }

    res = new NextResponse(
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
