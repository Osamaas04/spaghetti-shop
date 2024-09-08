// pages/api/user.js

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";// Adjust the import path as needed

export const GET = async (request) => {
  try {
    await dbConnect();

    // Assume there's some way to identify the current user (e.g., session token or user ID from cookies)
    // For demonstration purposes, let's just fetch the first user
    const user = await User.findOne(); // Replace with proper user identification

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Exclude sensitive information (e.g., password) before sending the response
    const { password, ...userData } = user.toObject();

    return new NextResponse(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
