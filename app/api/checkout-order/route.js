import { NextResponse } from "next/server";
import { storeOrder } from "@/quires/orders";
import { dbConnect } from "@/lib/mongo";

export const POST = async (request) => {
  try {
    const { name, email, address, phone, total } = await request.json();

    await dbConnect();

    const newOrder = {
      name,
      address,
      email,
      phone,
      total,
    };

    await storeOrder(newOrder);

    return new NextResponse("Order has been placed", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
