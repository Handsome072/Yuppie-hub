import connectToMongo from "@/lib/db";
import UserModel from "@/lib/models/user.model";
import { isEmpty } from "@/lib/utils/isEmpty";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToMongo();
    let user;
    const { id } = params;
    if (!isValidObjectId(id)) {
      user = await UserModel.find({ name: id });
      return new NextResponse(JSON.stringify({ user }, { status: 404 }));
    }
    user = await UserModel.findById(id);
    if (isEmpty(user))
      return new NextResponse(
        JSON.stringify({ error: "Aucun utilisateur trouvé" }, { status: 404 })
      );
    const { password, tokens, isAdmin, ...userInfos } = Object.assign(
      {},
      user.toJSON()
    );
    return new NextResponse(JSON.stringify({ userInfos }, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }, { status: 500 })
    );
  }
};
export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    if (!isValidObjectId(id)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid ID" }, { status: 404 })
      );
    }
    await connectToMongo();
    const user = await UserModel.findByIdAndDelete(id);
    if (!user)
      return new NextResponse(
        JSON.stringify({ error: "Aucun utilisateur trouvé" }, { status: 404 })
      );
    return new NextResponse(JSON.stringify(user, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }, { status: 500 })
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    if (!isValidObjectId(id)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid ID" }, { status: 404 })
      );
    }
    await connectToMongo();
    const user = await UserModel.findById(id);
    if (!user)
      return new NextResponse(
        JSON.stringify({ error: "Aucun utilisateur trouvé" }, { status: 404 })
      );
    const infos = await req.json();
    if (isEmpty(infos)) {
      return new NextResponse(
        JSON.stringify({ error: "Required" }, { status: 400 })
      );
    }
    const userInfosToUpdate = {
      $set: {},
    };

    for (const key in infos) {
      const value = infos[key];
      if (key && value !== undefined) {
        if (key === "username") {
          const usn = value.charAt(0).toUpperCase() + value.slice(1);
          userInfosToUpdate.$set[key] = usn;
        } else {
          userInfosToUpdate.$set[key] = value;
        }
      }
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      userInfosToUpdate,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    ).catch((err) => {
      return new NextResponse(
        JSON.stringify({ error: err.message }, { status: 500 })
      );
    });
    const { password, tokens, isAdmin, ...userInfos } = Object.assign(
      {},
      updatedUser.toJSON()
    );
    return new NextResponse(
      JSON.stringify({ updatedUser: userInfos }, { status: 200 })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err.message }, { status: 500 })
    );
  }
};
