import { NextResponse } from "next/server";
import { storeContact } from "@/quires/contacts";
import { dbConnect } from "@/lib/mongo";


export const POST = async (request) => {
  const { name, email, message } = await request.json();

  await dbConnect();

  const newMsg = {
    name,
    email,
    message,
  };

  try {
    await storeContact(newMsg);
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse("Msg has been sent", {
    status: 200,
  });
};
