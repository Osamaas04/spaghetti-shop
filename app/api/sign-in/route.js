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

  // Check if the "login-success" cookie is set to true
  const cookies = request.cookies;
  if (cookies.get("login-success") === "true") {
    // If the cookie is set to true, assume the user is authenticated
    return new NextResponse("User authenticated via cookie", {
      status: 200,
    });
  }

  const existingUser = await User.findOne({
    $or: [
      { email: email_username },
      { username: email_username }
    ]
  });

  if (!existingUser || password !== existingUser.password) {

    // If credentials are invalid, set the login-success cookie to false
    const response = new NextResponse("Invalid credentials", {
      status: 401,
    });


    response.cookies.set("login-success", "false", {
      httpOnly: false,
      secure: false,
      maxAge: 3600,

    // Set a vulnerable cookie
    response.cookies.set("login-success", "false", {
      httpOnly: false, // Vulnerability: Allow JavaScript access to this cookie
      secure: false,   // Vulnerability: Allow cookie over insecure HTTP
      maxAge: 3600,    // 1 hour

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

  // If credentials are valid, set the login-success cookie to true
  const response = new NextResponse("User authenticated", {

    status: 200,
  });

  response.cookies.set("login-success", "true", {

    httpOnly: false,
    secure: false,
    maxAge: 3600,

    httpOnly: false, // Vulnerability: Allow JavaScript access to this cookie
    secure: false,   // Vulnerability: Allow cookie over insecure HTTP
    maxAge: 3600,    // 1 hour

    path: "/",
  });

  return response;
};
