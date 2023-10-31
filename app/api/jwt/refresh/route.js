import { cookieName } from "@/constants";
import { refreshToken, verifyToken } from "@/lib/jwt";
import { isEmpty } from "@/lib/utils/isEmpty";
import { NextResponse } from "next/server";
export const GET = async (req) => {
  try {
    // const token =req.cookies.get(cookieName);
    // if (isEmpty(token)) {
    //   return new NextResponse(
    //     JSON.stringify({ error: "No refreshToken" }, { status: 400 })
    //   );
    // }
    // const verify = refreshToken(token);
    // if (verify.error) {
    //   return new NextResponse(
    //     JSON.stringify({ error: "Invalid Token" }, { status: 403 })
    //   );
    // }
    // return new NextResponse(JSON.stringify(verify, { status: 200 }));
    return new NextResponse(
      JSON.stringify({ message: "Middleware running" }, { status: 200 })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }, { status: 500 })
    );
  }
};
