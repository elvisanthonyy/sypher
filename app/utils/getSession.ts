import { getServerSession } from "next-auth";
import dbConnect from "@/libs/dbConnect";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getSession = async () => {
  await dbConnect();
  return await getServerSession(authOptions);
};
