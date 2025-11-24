import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Cart } from "@/models/cart";
import { CartItem } from "@/app/context/CartContext";

interface ReqBody {
  userId: string;
  cartId: string;
  itemId: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const { userId, itemId } = (await req.json()) as ReqBody;

  try {
    if (!userId) {
      return NextResponse.json({
        status: "error",
        message: "no means of Identification foung",
      });
    }
    const cart = await Cart.findOne({ userId: userId });

    console.log(cart);
    if (!cart) {
      return NextResponse.json({
        status: "error",
        message: "cart not found",
      });
    }

    const oneItem = cart.items.find((i: CartItem) => i.productId === itemId);

    return NextResponse.json({ status: "okay", cartItem: oneItem });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export { handler as POST };
