import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Product } from "@/models/product";

//to get all products
const handler = async () => {
  console.log("hello");
  await dbConnect();

  try {
    const products = await Product.find();
    console.log("TYPE", typeof Product);
    if (!products) {
      return NextResponse.json({ message: "no products found" });
    }
    return NextResponse.json({ products });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ status: "error" });
  }
};

export { handler as GET };
