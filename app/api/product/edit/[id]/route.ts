import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Product } from "@/models/product";
import cloudinary from "@/libs/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const handler = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  await dbConnect();
  const { id } = await context.params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      status: "error",
      message: "session not found",
    });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({
      status: "error",
      message: "your are not an admin",
    });
  }
  const formData = await req.formData();
  const file = formData.get("image") as File;
  const name = formData.get("name");
  const type = formData.get("type");
  const category = formData.get("category");
  const price = Number(formData.get("price"));
  const unitsAvailable = Number(formData.get("unitsAvailable"));

  if (!file) {
    const product = await Product.findByIdAndUpdate(id, {
      name,
      type,
      category,
      price,
      unitsAvailable,
    });
    await product.save();
    return NextResponse.json({
      status: "okay",
      message: "product updated successfully",
    });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(base64, {
      folder: "products",
      upload_preset: process.env.CLOUD_PRESET,
    });
    console.log(process.env.CLOUD_PRESET);
    const product = await Product.findByIdAndUpdate(id, {
      name,
      type,
      category,
      price,
      unitsAvailable,
      image: {
        filename: file.name,
        url: result.secure_url,
      },
    });
    await product.save();
    return NextResponse.json({
      status: "okay",
      message: "product updated successfully",
    });
  } catch (error: any) {
    console.error("error", error);

    return NextResponse.json({
      error: error.message,
      message: "something went wrong",
    });
  }
};

export { handler as POST };
