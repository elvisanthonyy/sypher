import { NextResponse } from "next/server";
import { Product } from "@/models/product";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Cart } from "@/models/cart";

interface ReqBody {
  productId: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { productId } = (await req.json()) as ReqBody;

  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  if (session.user.role === "user") {
    return NextResponse.json(
      { message: "you are not an admin" },
      { status: 401 }
    );
  }

  try {
    const products = await Product.findByIdAndDelete(productId);
    const carts = await Cart.find({
      "items.productId": {
        $in: [productId],
      },
    });

    carts.forEach((cart) => {
      cart?.items?.pull({ productId: productId });
      cart.save();
    });

    return NextResponse.json(
      { message: "product deleted", carts },
      { status: 200 }
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 401 }
    );
  }
};

export { handler as POST };
