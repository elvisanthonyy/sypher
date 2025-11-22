import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Cart } from "@/models/cart";
import { IItem } from "@/models/user";

interface ReqBody extends IItem {
  _id: string;
  userId: string;
  cartId: string;
  unitsAvailable: number;
}

const handler = async (req: Request) => {
  await dbConnect();
  const {
    userId,
    cartId,
    productId,
    name,
    type,
    category,
    price,
    qty,
    unitsAvailable,
  } = (await req.json()) as ReqBody;

  try {
    let cart = await Cart.findOne(
      userId ? { userId: userId } : { cartId: cartId }
    );
    if (!cart) {
      cart = await new Cart({
        userId: userId || undefined,
        cartId: cartId || undefined,
        items: [],
      });
    }

    const existingItem = cart?.items.find(
      (i: any) => i.productId.toString() === productId
    );
    if (existingItem) {
      console.log("it exist");
      existingItem.qty += qty;
    } else {
      cart.items.push({
        productId,
        name,
        type,
        category,
        price,
        qty,
        unitsAvailable,
      });
    }

    await cart.save();

    return NextResponse.json({ message: "item added or updated" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export { handler as POST };
