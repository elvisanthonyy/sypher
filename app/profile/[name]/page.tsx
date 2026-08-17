import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/libs/dbConnect";
import { redirect } from "next/navigation";
import NavTwo from "@/app/components/nav/NavTwo";
import ProfileMain from "@/app/components/profile/ProfileMain";

const baseURL = process.env.BASE_URL;

export async function generateMetadata({ params }) {
  const reqBody = await params;
  return {
    title: `${decodeURI(reqBody.name)}`,
  };
}

const page = async () => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  const res = await fetch(`${baseURL}/api/profile/user/${session?.user?.id}`);

  const data = await res.json();

  return (
    <div className="w-full min-h-dvh pt-20">
      <NavTwo name="profile" />
      <ProfileMain user={data?.user} />
    </div>
  );
};

export default page;
