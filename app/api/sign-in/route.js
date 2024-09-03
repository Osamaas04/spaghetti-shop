import { NextResponse } from "next/server";
import { User } from "@/model/user-model";
import { dbConnect } from "@/lib/mongo";
import jwt from "jsonwebtoken";


export const POST = async (request) => {
  const { email, password } = await request.json();

  await dbConnect();

  const existingUser = await User.findOne({ email });

  
  if (!existingUser) {
    return new NextResponse("You don't have an account", {
      status: 400,
    });
  }

  const matchingPass = password === existingUser.password;

  if (!matchingPass) {
    return new NextResponse("Invalid credentials", {
      status: 401,
    });
  }

  // Generate a JWT
  const token = jwt.sign(
    { userId: existingUser._id, email: existingUser.email },
    process.env.JWT_SECRET, // Replace with your secret
    { expiresIn: '1h' } // Token expiration time
  );

  // Set the JWT as a cookie in the response
  const response = new NextResponse("User authenticated", {
    status: 200,
  });

  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 3600, // 1 hour
    path: "/",
  });

  return response;
};
