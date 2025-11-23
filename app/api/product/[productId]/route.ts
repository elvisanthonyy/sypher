import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Product } from "@/models/product";

//getting one product
const handler = async (
  req: Request,
  context: { params: Promise<{ productId: string }> }
) => {
  const { productId } = await context.params;
  console.log(productId);
  await dbConnect();

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({
        status: "error",
        message: "product not found",
      });
    }

    return NextResponse.json({ status: "okay", product });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });
  }
};

export { handler as GET };
