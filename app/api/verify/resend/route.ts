import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import { generateOTP } from "@/libs/generateOTP";
import { sendOTP } from "@/libs/sendOtp";

interface ReqBody {
  email: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const { email } = (await req.json()) as ReqBody;
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

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;

    await user.save();
    await sendOTP(email, otp);
    return NextResponse.json({ status: "okay", message: "otp has been sent" });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "something went wromg",
    });
  }
};

export { handler as POST };
