import { verifyToken } from "@/lib/jwt";
import { isEmpty } from "@/lib/utils/isEmpty";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { token } = params;
    if (isEmpty(token)) {
      return new NextResponse(
        JSON.stringify({ error: "No token" }, { status: 200 })
      );
    }
    const verify = verifyToken(token);
    if (verify?.name === "TokenExpiredError") {
      return new NextResponse(
        JSON.stringify({ expiredTokenError: "Invalid token" }, { status: 200 })
      );
    } else if (isEmpty(verify?.infos)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid token" }, { status: 200 })
      );
    }
    return new NextResponse(JSON.stringify(verify, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }, { status: 500 })
    );
  }
};
