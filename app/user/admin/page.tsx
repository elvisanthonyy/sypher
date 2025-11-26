import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Nav from "@/app/components/nav/Nav";
import AdminMain from "@/app/components/admin/AdminMain";
import { cookies } from "next/headers";

const baseURL = process.env.BASE_URL;

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }
  if (session?.user?.role === "user") {
    redirect("/auth/admin/redirect");
  }

  const res = await fetch(`${baseURL}/api/admin/getdetails`, {
    method: "GET",
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });

  const data = await res.json();

  return (
    <div className="w-full pt-22 min-h-dvh flex justify-center">
      <Nav name="admin" />
      <AdminMain details={data?.details} />
    </div>
  );
};

export default page;
