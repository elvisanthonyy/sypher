import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";

interface ReqBody {
  token: string;
  password: string;
}

const handler = async (req: Request) => {
  await dbConnect();
  const { token, password } = (await req.json()) as ReqBody;
  try {
    const user = await User.findOne({ resetToken: token });

    if (!token) {
      return NextResponse.json(
        { message: "something went wromg" },
        { status: 401 }
      );
    }

    if (new Date(Date.now()) > user.resetTokenExpiry) {
      return NextResponse.json({ message: "link expired" }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 200 });
    }

    const hashPass = await bcrypt.hash(password, 10);
    user.password = hashPass;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "password reset was successfull" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 401 }
    );
  }
};

export { handler as POST };
