import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookieName } from "./lib/constants";
import { isEmpty } from "./lib/utils/isEmpty";
export function middleware(req) {
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  } else if (
    req.nextUrl.pathname === ("/login" || "/register" || "/fail" || "/success")
  ) {
    const token = req.cookies.get(cookieName);
    if (!isEmpty(token?.value) || !isEmpty(jwt.decode(token?.value))) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  } else if (req.nextUrl.pathname === "/home") {
    const token = req.cookies.get(cookieName);
    if (isEmpty(token?.value) || isEmpty(jwt.decode(token?.value))) {
      req.cookies.delete(cookieName);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}
