import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";

export const POST = async (request) => {
  const { email_username, password } = await request.json();

  await dbConnect();

  // Find user by email or username
  const existingUser = await User.findOne({
    $or: [
      { email: email_username },
      { username: email_username }
    ]
  });

  // If user not found, check for "login-success" cookie
  if (!existingUser) {
    const cookies = request.cookies;
    if (cookies.get("login-success") === "true") {
      return new NextResponse("User authenticated via cookie", {
        status: 200,
      });
    }

    // If credentials are invalid, set the "login-success" cookie to false
    const response = new NextResponse("Invalid credentials", {
      status: 401,
    });

    response.cookies.set("login-success", "false", {
      httpOnly: false, // Vulnerable to JavaScript access
      secure: false,   // Vulnerable to insecure HTTP
      maxAge: 3600,    // Cookie expires in 1 hour
      path: "/",
    });

    return response;
  }

  // If user found, check password
  if (password !== existingUser.password) {
    // If credentials are invalid, set the "login-success" cookie to false
    const response = new NextResponse("Invalid credentials", {
      status: 401,
    });

    response.cookies.set("login-success", "false", {
      httpOnly: false, // Vulnerable to JavaScript access
      secure: false,   // Vulnerable to insecure HTTP
      maxAge: 3600,    // Cookie expires in 1 hour
      path: "/",
    });

    return response;
  }

  // If credentials are valid, set both cookies (login-success and email)
  const response = new NextResponse(JSON.stringify({
    message: "User authenticated",
    email: existingUser.email,
    username: existingUser.username
  }), {
    status: 200,
  });

  // Set login-success cookie
  response.cookies.set("login-success", "true", {
    httpOnly: false, // Vulnerable to JavaScript access
    secure: false,   // Vulnerable to insecure HTTP
    maxAge: 3600,    // Cookie expires in 1 hour
    path: "/",
  });

  // Set email cookie
  response.cookies.set("user-email", existingUser.email, {
    httpOnly: false, // Accessible via JavaScript
    secure: false,   // Vulnerable to insecure HTTP, can set to true in production
    maxAge: 3600,    // Cookie expires in 1 hour
    path: "/",
  });

  return response;
};
