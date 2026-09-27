import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/libs/dbConnect";
import { redirect } from "next/navigation";

const page = async () => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(`/profile/${encodeURI(session.user.name)}`);
  } else {
    redirect(`/auth/signin?redirectUrl=/profile/check/redirect`);
  }

  return <div className="">Redirecting....</div>;
};

export default page;
