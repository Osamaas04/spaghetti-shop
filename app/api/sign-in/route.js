import { NextResponse } from "next/server";
import { User } from "@/model/user-model";
import { dbConnect } from "@/lib/mongo";

export const POST = async (request) => {
  const { email_username, password } = await request.json();

  await dbConnect();

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

    // Set a vulnerable cookie
    response.cookies.set("login-success", "false", {
      httpOnly: false, // Vulnerability: Allow JavaScript access to this cookie
      secure: false,   // Vulnerability: Allow cookie over insecure HTTP
      maxAge: 3600,    // 1 hour
      path: "/",
    });

    return response;
  }

  // If credentials are valid, set the login-success cookie to true
  const response = new NextResponse("User authenticated", {
    status: 200,
  });

  response.cookies.set("login-success", "true", {
    httpOnly: false, // Vulnerability: Allow JavaScript access to this cookie
    secure: false,   // Vulnerability: Allow cookie over insecure HTTP
    maxAge: 3600,    // 1 hour
    path: "/",
  });

  return response;
};
