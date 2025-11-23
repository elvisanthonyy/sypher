import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Product } from "@/models/product";

const handler = async (req: Request) => {
  await dbConnect();
  const reqBody = await req.json();
  console.log(reqBody);
  try {
    const newProduct = new Product(reqBody);
    await newProduct.save();
    return NextResponse.json({
      status: "okay",
      message: "product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({
      statut: "error",
      message: "something went wrong",
    });
  }
};

export { handler as POST };
