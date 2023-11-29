import {
  activateUserCompteTokenName,
  authTokenName,
  cookieName,
  maxAgeAuthToken,
  resetPasswordTokenName,
} from "@/lib/constants";
import { createToken, verifyExistToken, verifyToken } from "@/lib/jwt";
import UserModel from "@/lib/models/user.model";
import { isEmpty } from "@/lib/utils/isEmpty";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    let verify;
    let user;
    let res;
    let infos;
    const { token } = params;

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
    } else if (verify.infos?.activateUserCompte) {
      const { existToken } = await verifyExistToken({
        id: verify.infos?.id,
        token,
        tokenName: activateUserCompteTokenName,
      });

      // error token not valid anymore
      if (isEmpty(existToken)) {
        return new NextResponse(
          JSON.stringify({ notAnymoreValidToken: true }, { status: 200 })
        );
      }
      const { id } = verify.infos;
      // remove existToken
      user = await UserModel.findByIdAndUpdate(
        id,
        {
          $pull: { tokens: existToken },
        },
        { new: true }
      ).catch((error) => console.log(error.message));

      if (user.isActive) {
        return new NextResponse(
          JSON.stringify({ error: "Already active" }, { status: 200 })
        );
      }

      // login
      const { password, tokens, isAdmin, image, ...userInfos } = Object.assign(
        {},
        user.toJSON()
      );
      infos = {
        id: user._id,
        userType: user.userType,
        isAdmin: user.isAdmin,
        lang: user.lang,
      };
      const authToken = createToken(infos, maxAgeAuthToken);

      res = new NextResponse(
        JSON.stringify(
          {
            active: true,
            user: { ...userInfos, image: user.image[0] || "" },
            token: authToken,
            userType: user.userType,
            lang: user.lang,
          },
          { status: 200 }
        )
      );

      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      };
      // adding cookies
      res.cookies.set(cookieName, authToken, options);
      return res;
    }

    return new NextResponse(JSON.stringify(verify, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }, { status: 500 })
    );
  }
};
