import { verifyToken } from "@/lib/jwt";
import UserModel from "@/lib/models/user.model";
import { isEmpty } from "@/lib/utils/isEmpty";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { token } = params;
    if (isEmpty(token)) {
      return new NextResponse(
        JSON.stringify({ noToken: "No token" }, { status: 200 })
      );
    }
    const verify = verifyToken(token);
    if (isEmpty(verify?.infos)) {
      return new NextResponse(
        JSON.stringify({ invalidToken: "Invalid token" }, { status: 200 })
      );
    }
    return new NextResponse(JSON.stringify(verify.infos, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }, { status: 500 })
    );
  }
};
