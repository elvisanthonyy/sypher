import { NextResponse } from "next/server";
import { Order } from "@/models/order";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { IUser } from "@/models/user";

interface ReqBody {
  userId: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { userId } = (await req.json()) as ReqBody;

  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  try {
    const orders = await Order.find({ userId: userId });

    return NextResponse.json(
      { message: "orders gotten", orders, userId },
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

export { handler as POST };
