import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminNav from "@/app/components/admin/AdminNav";
import AdminMain from "@/app/components/admin/AdminMain";
import { cookies } from "next/headers";
import dbConnect from "@/libs/dbConnect";

const baseURL = process.env.BASE_URL;

const page = async () => {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }
  if (session?.user?.role === "user") {
    return redirect("/auth/admin/redirect");
  }

  const res = await fetch(`${baseURL}/api/admin/getdetails`, {
    method: "GET",
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });

  const data = await res.json();

  console.log(data);

  return (
    <div className="w-full pt-20 min-h-dvh flex flex-col justify-start items-center gap-4">
      <AdminNav />
      <AdminMain details={data?.details} />
    </div>
  );
};

export default page;
