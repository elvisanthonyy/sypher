import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { IOrder } from "@/models/order";
import { Order } from "@/models/order";
import { sendOrderMessage } from "@/libs/sendOrderMessage";

const handler = async (req: Request) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { userId, name, email, productId, productName, price, qty } =
    (await req.json()) as IOrder;
  if (!session) {
    return NextResponse.json({ status: "error", message: "session not found" });
  }

  try {
    const order = new Order({
      userId,
      name,
      email,
      productId,
      productName,
      price,
      qty,
    });

    await order.save();
    await sendOrderMessage(order);
    return NextResponse.json({
      status: "okay",
      message: "Your order has been placed, check email for more info",
      order,
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({
      status: "error",
      message: "somethong went wrong",
    });
  }
};

export { handler as POST };
