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
  console.log(password);
  try {
    if (!token) {
      return NextResponse.json(
        { message: "token not present" },
        { status: 402 }
      );
    }
    const user = await User.findOne({ resetToken: token });

    if (!user) {
      return NextResponse.json(
        { message: "user link expired" },
        { status: 404 }
      );
    }

    if (new Date(Date.now()) > user.resetTokenExpiry) {
      return NextResponse.json({ message: "link expired" }, { status: 401 });
    }

    const hashPass = await bcrypt.hash(password, 10);
    user.password = hashPass;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "password reset successfull" },
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
