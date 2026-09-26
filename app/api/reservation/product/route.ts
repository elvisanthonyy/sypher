import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { IReservation } from "@/models/Reservation";
import { Reservation } from "@/models/Reservation";
import { sendOrderMessage } from "@/libs/sendOrderMessage";
import { Product } from "@/models/product";

const handler = async (req: Request) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { userId, name, email, productId, productName, price, qty } =
    (await req.json()) as IReservation;
  if (!session) {
    return NextResponse.json({ status: "error", message: "session not found" });
  }

  try {
    const reservation = new Reservation({
      userId,
      name,
      email,
      productId,
      productName,
      price,
      qty,
    });

    await reservation.save();
    await sendOrderMessage(reservation);
    const product = await Product.findById(productId);
    if (product) {
      let productQty: any = product.unitsAvailable;
      product.unitsAvailable = productQty - qty;

      await product.save();
    }

    return NextResponse.json({
      status: "okay",
      message: "Your reservation has been made, check email for more info",
      product: product ? product : "none",
      reservation,
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
