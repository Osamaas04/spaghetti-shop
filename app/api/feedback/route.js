import { NextResponse } from "next/server";
import { Contact } from "@/model/contact-model";
import { dbConnect } from "@/lib/mongo";

// GET request handler to fetch feedbacks
export const GET = async () => {
  await dbConnect();

  try {
    const feedbacks = await Contact.find({}); // Fetch all feedbacks from the database
    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
