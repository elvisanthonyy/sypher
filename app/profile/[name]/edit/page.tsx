import ProfileNav from "@/app/components/profile/ProfileNav";
import dbConnect from "@/libs/dbConnect";
import { getSession } from "@/app/utils/getSession";
import { redirect } from "next/navigation";
import EditMain from "./EditMain";

const baseURL = process.env.BASE_URL;

const page = async () => {
  await dbConnect();
  const session = await getSession();
  if (!session) {
    redirect("/auth/signin");
  }
  const res = await fetch(`${baseURL}/api/profile/user/${session.user.id}`);
  const data = await res.json();
  console.log(data);
  return (
    <div className="mt-22 w-full min-h-dvh">
      <ProfileNav />
      <EditMain user={data.user} />
    </div>
  );
};

export default page;
