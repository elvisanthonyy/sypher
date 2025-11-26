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
  const { userId, cartId, productId } = (await req.json()) as ReqBody;

  try {
    let cart = await Cart.findOne(
      userId ? { userId: userId } : { cartId: cartId }
    );
    if (!cart) {
      return NextResponse.json({ status: "error", message: "cart not found" });
    }

    cart.items.pull({ productId: productId });
    await cart.save();

    return NextResponse.json({ message: "item removed from card" });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: error });
  }
};

export { handler as POST };
