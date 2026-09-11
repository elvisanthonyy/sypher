import { NextResponse } from "next/server";
import { Order } from "@/models/order";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IUser } from "@/models/user";

interface ReqBody {
  orderId: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { orderId } = (await req.json()) as ReqBody;

  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  try {
    const order = await Order.findOne({ _id: orderId });

    if (!order) {
      return NextResponse.json(
        { message: "Something went wrong", status: "error" },
        { status: 200 },
      );
    }

    if (order.status.at(-1) === "pending") {
      order?.status.push("cancelled");

      await order.save();

      return NextResponse.json(
        { message: "Order has been cancelled successfully", status: "okay" },
        { status: 200 },
      );
    }

    if (order.status.at(-1) === "cancelled") {
      order?.status.push("pending");

      await order.save();

      return NextResponse.json(
        {
          message: "Order has been been replaced successfully",
          status: "okay",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 401 },
    );
  }
};

export { handler as PUT };
