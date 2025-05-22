import { NextResponse } from "next/server";
import { storeOrder } from "@/quires/orders";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";

export const POST = async (request) => {
  try {
    const { email, name, address, phone, total } = await request.json();

    await dbConnect();

    // Find the user and check balance
    const user = await User.findOne({ email });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const totalPrice = parseFloat(total);
    if (user.balance < totalPrice) {
      return new NextResponse("Insufficient balance", { status: 400 });
    }

    // Deduct the balance
    user.balance -= totalPrice;
    await user.save();

    const newOrder = {
      name,
      address,
      email,
      phone,
      total,
    };

    await storeOrder(newOrder);

    return new NextResponse("Order has been placed", { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
