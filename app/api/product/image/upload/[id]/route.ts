import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { Product } from "@/models/product";
import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "/public/product-images");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});

const upload = multer({ storage });

const handler = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  await dbConnect();
  const paramBody = await params
  return new Promise((resolve) => {
    upload.single('image')(req, {} as any, async (err: any) => {
        if(err) return resolve(NextResponse.json({success: false, message: err.message}))

       const file = (req as any).file
       if(!file) return resolve(NextResponse.json({sucsess: false, message: 'no file uploaded'}))

        const product = await Product.findByIdAndUpdate(paramBody.id, image: {
          filename: file.filename,
          url: `/product-images/${file.filename}`
        })
        resolve(NextResponse.json({success: true, product}))
    })
  })
};

export { handler as POST };
