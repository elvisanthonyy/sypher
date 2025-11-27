import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import { Cart } from "@/models/cart";

interface ReqBody {
  email: string;
  otp: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const { email, otp } = (await req.json()) as ReqBody;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ status: "error", message: "user not found" });
    }

    if (user.verified === true) {
      return NextResponse.json({
        status: "error",
        message: "user already vefried",
      });
    }
    if (new Date(Date.now()) > user.otpExpires) {
      return NextResponse.json({ status: "error", message: "otp expired" });
    }

    const match = user.otp === otp;

    if (!match) {
      return NextResponse.json({ status: "error", message: "otp expired" });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    const userCart = await Cart.create({
      userId: user._id,
    });
    await user.save();
    return NextResponse.json({ status: "okay", message: "User verified" });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "something went wromg",
    });
  }
};

export { handler as POST };
