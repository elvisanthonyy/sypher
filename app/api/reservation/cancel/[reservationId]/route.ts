import { NextResponse } from "next/server";
import { Reservation } from "@/models/Reservation";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IUser } from "@/models/user";

interface ReqBody {
  reservationId: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { reservationId } = (await req.json()) as ReqBody;

  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  try {
    const order = await Reservation.findOne({ _id: reservationId });

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
        {
          message: "Reservation has been cancelled successfully",
          status: "okay",
        },
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
