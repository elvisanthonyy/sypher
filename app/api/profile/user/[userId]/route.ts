import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import { NextApiRequest } from "next";

//get user for profile
const handler = async (
  req: NextApiRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
) => {
  await dbConnect();
  const { userId } = await params;
  console.log("param", userId);
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({
        status: "error",
        message: "could not find user",
      });
    }
    return NextResponse.json({
      status: "okay",
      user,
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({
      status: "error",
      message: error,
    });
  }
};

export { handler as GET };
