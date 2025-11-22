import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Product } from "@/models/product";

//getting one product
const handler = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  const { productId } = params;
  await dbConnect();

  console.log(productId);
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
