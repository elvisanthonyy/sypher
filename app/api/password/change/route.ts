import { NextResponse } from "next/server";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import dbConnect from "@/libs/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

interface ReqBody {
  oldPassword: string;
  newPassword: string;
  userId: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { oldPassword, newPassword, userId } = (await req.json()) as ReqBody;

  if (!session) {
    return NextResponse.json({
      status: "error",
      message: "sessions not found",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        status: "error",
        message: "user not found",
      });
    }

    const validatePassword = await bcrypt.compare(oldPassword, user.password);
    if (!validatePassword) {
      return NextResponse.json({
        status: "error",
        message: "Old password is wrong",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({
      status: "okay",
      message: "password has been updated",
    });
  } catch (error) {}
};

export { handler as POST };
