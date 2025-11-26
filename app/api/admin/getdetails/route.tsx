import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Product } from "@/models/product";
import { Order } from "@/models/order";

const handler = async (req: Request) => {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    return NextResponse.json(
      { message: "you are not an admin" },
      { status: 401 }
    );
  }

  try {
    const orders = await Order.find();
    const products = await Product.find();

    return NextResponse.json(
      {
        message: "Details gotten",
        details: {
          totalProducts: products?.length,
          totalOrders: orders?.length,
        },
      },
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

export { handler as GET };
