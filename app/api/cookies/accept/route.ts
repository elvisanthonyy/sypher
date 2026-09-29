import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Cart } from "@/models/cart";
import dbConnect from "@/libs/dbConnect";
import { IItem } from "@/models/user";

interface ReqBody {
  cartItems: IItem[];
}

// for accepting cookies
const handler = async (req: Request) => {
  const userCartID = randomUUID();
  const { cartItems } = (await req.json()) as ReqBody;
  await dbConnect();

  try {
    if (cartItems) {
      //create cart when user accepts cookies
      const newCart = await Cart.create({
        cartId: userCartID,
      });

      //Adding local storage cart Items to new sessions cart
      cartItems.forEach((cartItem) => {
        newCart.items.push({
          productId: cartItem._id,
          name: cartItem?.name,
          type: cartItem?.type,
          category: cartItem?.category,
          price: cartItem?.price,
          qty: cartItem?.qty,
          image: {
            url: cartItem.image?.url.toString(),
          },
        });
      });

      await newCart.save();
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: "cart_id",
      value: userCartID,
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ status: "error", error });
  }
};

export { handler as POST };
