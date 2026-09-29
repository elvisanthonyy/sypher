import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Cart } from "@/models/cart";
import { IItem } from "@/models/user";
import { Types } from "mongoose";

interface ReqBody extends IItem {
  userId: string;
  cartId: string;
  unitsAvailable: number;
  imageURL: string;
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
    imageURL,
  } = (await req.json()) as ReqBody;

  try {
    let cart = await Cart.findOne(
      userId ? { userId: userId } : { cartId: cartId },
    );
    if (!cart) {
      cart = await new Cart({
        userId: userId || undefined,
        cartId: cartId || undefined,
        items: [],
      });
    }

    const existingItem = cart?.items.find(
      (i: any) => i.productId.toString() === productId,
    );
    if (existingItem) {
      existingItem.qty += qty;
      return NextResponse.json({
        status: "error",
        message: "Item is already in cart",
      });
    }
    cart.items.push({
      productId: productId,
      name: name,
      type: type,
      category: category,
      price: price,
      qty: 1,
      unitsAvailable: unitsAvailable,
      image: {
        url: imageURL?.toString(),
      },
    } as any);

    await cart.save();

    return NextResponse.json({
      status: "Okay",
      message: "Item is already in cart",
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ status: "error", message: error });
  }
};

export { handler as POST };
