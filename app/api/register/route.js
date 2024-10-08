import { NextResponse } from "next/server";
import { createUser } from "@/quires/users";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";

export const POST = async (request) => {
  const { name, username, email, password } = await request.json();

  await dbConnect();

  const existingUser = await User.findOne({email})

  if (existingUser) {
    return new NextResponse("User already exists", {
      status: 401,
    });
  }

  const existingUsername = await User.findOne({username})

  if(existingUsername) {
    return new NextResponse("Username already exists", {
      status: 401,
    });
  }

  const newUser = {
    name,
    username,
    email,
    password,
  };

  try {
    await createUser(newUser);
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 200,
  });
};
