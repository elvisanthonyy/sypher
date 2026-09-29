import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Cart } from "@/models/cart";

interface ReqBody {
  userId: string;
  itemId: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const { itemId, userId } = (await req.json()) as ReqBody;

  try {
    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return NextResponse.json({
        status: "error",
        message: "cart not found",
      });
    }

    const oneItem = await cart.items.find(
      (i) => i.productId.toString() === itemId,
    );
    if (!oneItem) {
      return NextResponse.json({
        status: "error",
        message: "item not found",
      });
    }

    if (oneItem.qty === 1) {
      return NextResponse.json({
        status: "error",
        message: "Item quantity can't be less than 1",
      });
    }
    oneItem.qty -= 1;
    await oneItem.save();
    await cart.save();
    return NextResponse.json({
      status: "okay",
      message: "Item has been updated successfully",
    });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export { handler as POST };
