import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import { sendResetMessage } from "@/libs/sendResetMessage";

const handler = async (req: Response) => {
  await dbConnect();
  const { email } = await req.json();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Email sent" }, { status: 200 });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60);

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    sendResetMessage(email, resetToken);
    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 401 }
    );
  }
};

export { handler as POST };
