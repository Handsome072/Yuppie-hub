import connectToMongo from "@/lib/db";
import UserModel from "@/lib/models/user.model";
import { isEmpty } from "@/lib/utils/isEmpty";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    let user;
    const { id } = params;
    const body = await req.json();

    if (
      isEmpty(id) ||
      !isValidObjectId(id) ||
      isEmpty(body) ||
      (isEmpty(body?.note) && isEmpty(body?.disponibilite))
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid ID" }, { status: 400 })
      );
    }

    await connectToMongo();
    user = await UserModel.findById(id);

    // error user not found
    if (isEmpty(user))
      return new NextResponse(
        JSON.stringify({ userNotFound: true }, { status: 404 })
      );

    const userInfosToUpdate = {
      $set: {},
    };

    for (const key in body) {
      const value = body[key];
      if (key && value !== undefined) {
        userInfosToUpdate.$set[key] = value;
      }
    }

    user = await UserModel.findByIdAndUpdate(id, userInfosToUpdate, {
      new: true,
    }).catch((err) => console.log(err));
    return new NextResponse(
      JSON.stringify({ user: { ...body } }, { status: 200 })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }, { status: 500 })
    );
  }
};
