import { NextResponse } from "next/server";
import { Cart } from "@/models/cart";
import dbConnect from "@/libs/dbConnect";
import { IItem } from "@/models/user";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface ReqBody {
  cartItems: IItem[];
  cartId: string;
  userId: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { cartItems, cartId } = (await req.json()) as ReqBody;
  console.log(cartItems);

  if (!session) {
    return NextResponse.json({ status: "error", message: "session not found" });
  }

  const user = await User.findById(session.user.id);

  if (!user) {
    return NextResponse.json({ status: "error", message: "user not found" });
  }
  try {
    //check if user already have a cart
    const userCart = await Cart.findOne({ userId: user._id });

    if (cartId) {
      const guestCart = await Cart.findOne({ cartId: cartId });
      guestCart.items.forEach((item) => {
        userCart.items.push(item);
      });
      await userCart.save();
      await guestCart.deleteOne();
      return NextResponse.json({ status: "okay", message: "cart merged" });
    }

    if (cartItems) {
      cartItems.forEach((cartItem) => {
        userCart.items.push({
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

      await userCart.save();
      return NextResponse.json({ status: "okay", message: "cart merged" });
    }
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ status: "error", error });
  }
};

export { handler as POST };
