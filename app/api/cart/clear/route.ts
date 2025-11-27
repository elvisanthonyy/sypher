import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Cart } from "@/models/cart";
import { IItem } from "@/models/user";

interface ReqBody extends IItem {
  _id: string;
  userId: string;
  cartId: string;
  unitsAvailable: number;
  imageURL: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const { userId, cartId } = (await req.json()) as ReqBody;

  try {
    const cart = await Cart.updateOne(
      userId ? { userId: userId } : { cartId: cartId },
      { $pull: { items: {} } }
    );

    return NextResponse.json({ message: "cart has been cleared" });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: error });
  }
};

export { handler as POST };
