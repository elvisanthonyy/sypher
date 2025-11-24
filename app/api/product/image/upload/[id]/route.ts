import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Product } from "@/models/product";
import fs from "fs";
import path from "path";

const handler = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  await dbConnect();
  const paramBody = await params;
  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file)
    return NextResponse.json({ sucsess: false, message: "no file uploaded" });

  const uploadDir = path.join(process.cwd(), "/public/product-images");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + "_" + file.name;
  fs.writeFileSync(path.join(uploadDir, filename), buffer);

  const product = await Product.findByIdAndUpdate(paramBody.id, {
    image: {
      filename: filename,
      url: `/product-images/${filename}`,
    },
  });
  return NextResponse.json({ sucsess: false, message: "something" });
};

export { handler as POST };
