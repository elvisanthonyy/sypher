import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Cart } from "@/models/cart";

interface ReqBody {
  userId: string;
  cartId: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const { userId, cartId } = (await req.json()) as ReqBody;

  try {
    if (!userId && !cartId) {
      return NextResponse.json({
        status: "error",
        message: "no means of Identification foung",
      });
    }
    const cart = await Cart.findOne(
      userId ? { userId: userId } : { cartId: cartId }
    );

    return NextResponse.json({ status: "okay", cart: cart?.items });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export { handler as POST };
