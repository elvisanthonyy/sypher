import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Nav from "@/app/components/nav/Nav";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }
  if (session?.user?.role === "user") {
    redirect("/auth/admin/redirect");
  }
  return (
    <div>
      <Nav name="admin" />
    </div>
  );
};

export default page;
