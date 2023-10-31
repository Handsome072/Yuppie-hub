import { cookieName } from "@/constants";
import { isEmpty } from "@/lib/utils/isEmpty";
import { NextResponse } from "next/server";
export const GET = async (req) => {
  try {
    const token = req.cookies.get(cookieName);
    if (isEmpty(token)) {
      return new NextResponse(
        JSON.stringify({ error: "No token" }, { status: 200 })
      );
    }
    let res = new NextResponse(
      JSON.stringify({ success: "Token deleted" }, { status: 200 })
    );
    res.cookies.set(cookieName, "", { maxAge: -1 });
    return res;
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }, { status: 500 })
    );
  }
};
