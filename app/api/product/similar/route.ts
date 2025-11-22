import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Product } from "@/models/product";

interface ReqBody {
  _id: string;
  name: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const { _id, name } = (await req?.json()) as ReqBody;
  try {
    const similarProducts = await Product.find({
      _id: { $ne: _id },
      name: { $regex: name.split(" ")[0] },
    });
    console.log(similarProducts);
    return NextResponse.json({ status: "okay", similarProducts });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });
  }
};

export { handler as POST };
