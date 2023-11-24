import { validatePassword } from "@/lib/controllers/auth.controller";
import connectToMongo from "@/lib/db";
import UserModel from "@/lib/models/user.model";
import { isEmpty } from "@/lib/utils/isEmpty";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
export const POST = async (req, { params }) => {
  try {
    const { id } = params;
    const body = await req.json();

    if (isEmpty(body?.token) || isEmpty(id) || !isValidObjectId(id)) {
      return new NextResponse(
        JSON.stringify({ error: "Data required" }, { status: 200 })
      );
    }

    await connectToMongo();
    user = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: { isActive: true },
        $pull: { tokens: body.token },
      },
      { new: true }
    ).catch((error) => console.log(error.message));

    return new NextResponse(
      JSON.stringify({ compteActive: true }, { status: 200 })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }, { status: 500 })
    );
  }
};
