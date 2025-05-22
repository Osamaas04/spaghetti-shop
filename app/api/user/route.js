// pages/api/user.js

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";// Adjust the import path as needed


export const GET = async (request) => {
  try {
    await dbConnect();

    const userEmail = request.cookies.get("user-email");

    const email = userEmail.value 

    const user = await User.findOne({email}); // Replace with proper user identification

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
