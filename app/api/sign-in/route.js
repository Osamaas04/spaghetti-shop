import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import mongoose from "mongoose";

export const POST = async (request) => {
  const { email_username, password } = await request.json();

  await dbConnect();

  // Use raw MongoDB query to bypass Mongoose protections
  const usersCollection = mongoose.connection.db.collection("users");

  // Directly use user input without sanitization
  const existingUser = await usersCollection.findOne({
    $or: [
      { email: email_username },
      { username: email_username }
    ],
    password: password // Injected password query
  });

  if (!existingUser) {
    // If credentials are invalid, set the login-success cookie to false
    const response = new NextResponse("Invalid credentials", {
      status: 401,
    });

    response.cookies.set("login-success", "false", {
      httpOnly: false,
      secure: false,
      maxAge: 3600,
      path: "/",
    });

    return response;
  }

  // If credentials are valid, return the user details
  const response = new NextResponse(JSON.stringify({
    message: "User authenticated",
    email: existingUser.email,
    username: existingUser.username,
    password: existingUser.password // Expose password
  }), {
    status: 200,
  });

  response.cookies.set("login-success", "true", {
    httpOnly: false,
    secure: false,
    maxAge: 3600,
    path: "/",
  });

  return response;
};
