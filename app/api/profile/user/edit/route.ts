import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";

const handler = async (req: Request) => {
  await dbConnect();
  const { userId, name, address, countryCode, number, gender, dateOfBirth } =
    await req.json();
  const updates = {
    name: name,
    address: address,
    number: Number(number),
    countryCode: countryCode,
    gender: gender,
    dateOfBirth: dateOfBirth,
  };

  try {
    console.log(updates);
    await User.findByIdAndUpdate(userId, updates);

    return NextResponse.json({
      status: "okay",
      message: "user profile updates",
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });
  }
};

export { handler as POST };
