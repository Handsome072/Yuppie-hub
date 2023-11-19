import { resetPasswordTokenName } from "@/lib/constants";
import { verifyExistToken, verifyToken } from "@/lib/jwt";
import { isEmpty } from "@/lib/utils/isEmpty";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    let verify;
    let { token } = params;

    if (isEmpty(token)) {
      return new NextResponse(
        JSON.stringify({ error: "No token" }, { status: 200 })
      );
    }

    verify = verifyToken(token);

    // error expired token
    if (verify?.name === "TokenExpiredError") {
      return new NextResponse(
        JSON.stringify({ expiredTokenError: true }, { status: 200 })
      );
    }
    // error invalid token
    else if (isEmpty(verify?.infos)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid token" }, { status: 200 })
      );
    }

    // token to reset password
    else if (verify.infos?.resetPassword) {
      const { existToken } = await verifyExistToken({
        id: verify.infos?.id,
        token,
        tokenName: resetPasswordTokenName,
      });

      // error token not valid anymore
      if (isEmpty(existToken)) {
        return new NextResponse(
          JSON.stringify({ notAnymoreValidToken: true }, { status: 200 })
        );
      }

      return new NextResponse(
        JSON.stringify(
          { secure: true, token: existToken, id: verify.infos.id },
          { status: 200 }
        )
      );
    }

    return new NextResponse(JSON.stringify(verify, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }, { status: 500 })
    );
  }
};
