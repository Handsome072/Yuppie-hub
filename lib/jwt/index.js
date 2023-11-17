import { maxAge } from "@/constants";
import jwt from "jsonwebtoken";
import connectToMongo from "../db";
import UserModel from "../models/user.model";
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
    return error;
  }
}
export const addNewToken = async ({ id, tokenName, valid, persist, token }) => {
  try {
    const newToken = { obj: tokenName, value: token };
    if (persist) {
      newToken.persist = persist;
    }
    if (valid) {
      newToken.valid = valid;
    }
    await connectToMongo();
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        $push: { tokens: newToken },
      },
      { new: true }
    );
    return user;
  } catch (error) {
    return { error: "Failed to add new token" };
  }
};
export const verifyExistToken = async ({ id, token, tokenName }) => {
  try {
    await connectToMongo();
    let user = await UserModel.findById(id);
    const existToken = user.tokens.find(
      (t) => t.obj === tokenName && t.value === token
    );
    return { existToken };
  } catch (error) {
    return { error: "Failed to find token" };
  }
};
export const removeExistToken = async ({ id, token, tokenName }) => {
  try {
    await connectToMongo();
    let user = await UserModel.findById(id);
    const existToken = user.tokens.find(
      (t) => t.obj === tokenName && t.value === token
    );
    user = await UserModel.findByIdAndUpdate(
      id,
      {
        $pull: { tokens: existToken },
      },
      { new: true }
    );
    return { user };
  } catch (error) {
    return { error: "Failed to find token" };
  }
};
