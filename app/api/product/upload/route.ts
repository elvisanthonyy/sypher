import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Product } from "@/models/product";
import fs from "fs";
import path from "path";

const handler = async (req: Request) => {
  await dbConnect();
  const formData = await req.formData();
  const file = formData.get("image") as File;
  const name = formData.get("name");
  const type = formData.get("type");
  const category = formData.get("category");
  const price = formData.get("price");
  const unitsAvailable = formData.get("unitsAvailable");

  try {
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
    const uploadDir = path.join(process.cwd(), "/public/product-images");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name;
    console.log(filename);
    fs.writeFileSync(path.join(uploadDir, filename), buffer);
    const newProduct = new Product({
      name,
      type,
      category,
      price,
      unitsAvailable,
      image: {
        filename: filename,
        url: `/product-images/${filename}`,
      },
    });
    await newProduct.save();
    return NextResponse.json({
      status: "okay",
      message: "product created successfully",
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
