import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import { sendOTP } from "@/libs/sendOtp";
import { generateOTP } from "@/libs/generateOTP";

interface UserBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  await dbConnect();
  const { name, email, password } = (await req.json()) as UserBody;

  try {
    if (!name || !email || !password) {
      return NextResponse.json({
        status: "error",
        message: "send require field",
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json({
        status: "error",
        message: "user exists already",
      });
    }

    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdAt = Date.now();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      otp: otp,
      createdAt: createdAt,
      otpExpires: otpExpires,
    });

    await user.save();
    await sendOTP(email, otp);
    return NextResponse.json({
      status: "okay",
      message: "account has been created successfully",
      user: { id: user._id, email, password },
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });
  }
}
