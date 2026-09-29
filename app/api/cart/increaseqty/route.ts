import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Cart } from "@/models/cart";
import { CartItem } from "@/app/context/CartContext";
import { Product } from "@/models/product";

interface ReqBody {
  userId: string;
  itemId: string;
  newQty: number;
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

    const product = await Product.findById(itemId);
    if (!product) {
      return NextResponse.json({
        status: "error",
        message: "Product not found",
      });
    }

    if (Number(product?.unitsAvailable) < oneItem.qty + 1) {
      return NextResponse.json({
        status: "error",
        message: "Reservation quantity is less than available products",
      });
    }
    oneItem.qty = oneItem.qty + 1;
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
