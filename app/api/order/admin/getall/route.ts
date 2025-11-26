import { NextResponse } from "next/server";
import { Order } from "@/models/order";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const handler = async (req: Request) => {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  if (session.user.role === "user") {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  try {
    const allOrders = await Order.find();

    return NextResponse.json(
      { message: "orders gotten", allOrders },
      { status: 200 }
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 401 }
    );
  }
};

export { handler as GET };
