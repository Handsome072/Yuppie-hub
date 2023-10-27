import { maxAge } from "@/constants";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import { isEmpty } from "../utils/isEmpty";
export function createToken(infos, max) {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    return console.log("JWT_SCECRET not found");
  }
  if (max && typeof max === "number") {
    const token = jwt.sign({ infos }, secretKey, { expiresIn: max });
    return token;
  }
  const token = jwt.sign({ infos }, secretKey, { expiresIn: maxAge });
  return token;
}
export function verifyToken(token) {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      return { error: "JWT_SCECRET not found" };
    }
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return error.message;
  }
}
export const addNewToken = async ({ id, tokenName, infos, persist, token }) => {
  let tokens = [];
  const user = await UserModel.findById(id);
  const existAuthToken = user.tokens?.find((t) => t.obj === tokenName);
  if (!isEmpty(existAuthToken)) {
    if (!isEmpty(infos)) {
      tokens = [
        ...user.tokens,
        { obj: tokenName, infos, value: token, infos, persist },
      ];
    } else {
      tokens = [
        ...user.tokens,
        { obj: tokenName, infos, value: token, persist },
      ];
    }
    await UserModel.findByIdAndUpdate(
      user._id,
      {
        $set: { tokens },
      },
      { new: true }
    );
  } else {
    tokens = [...user.tokens, { obj: tokenName, value: token, persist }];

    await UserModel.findByIdAndUpdate(
      user._id,
      {
        $set: { tokens },
      },
      { new: true }
    );
  }
};
