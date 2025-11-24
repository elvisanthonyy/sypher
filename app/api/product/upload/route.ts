import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Product } from "@/models/product";
import fs from "fs";
import path, { resolve } from "path";
import cloudinary from "@/libs/cloudinary";

const handler = async (req: Request) => {
  await dbConnect();
  const formData = await req.formData();
  const file = formData.get("image") as File;
  const name = formData.get("name");
  const type = formData.get("type");
  const category = formData.get("category");
  const price = Number(formData.get("price"));
  const unitsAvailable = Number(formData.get("unitsAvailable"));

  if (!file) {
    const newProduct = new Product({
      name,
      type,
      category,
      price,
      unitsAvailable,
    });
    await newProduct.save();
    return NextResponse.json({
      status: "okay",
      message: "product created successfully without image",
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
    const newProduct = new Product({
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
    await newProduct.save();
    return NextResponse.json({
      status: "okay",
      message: "product created successfully",
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
