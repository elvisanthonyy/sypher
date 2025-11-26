import EditProductMain from "@/app/components/edit/EditProductMain";
import ProfileNav from "@/app/components/profile/ProfileNav";
import dbConnect from "@/libs/dbConnect";
import { getSession } from "@/app/utils/getSession";
import { redirect } from "next/navigation";

const baseURL = process.env.BASE_URL;

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  const paramReq = await params;

  if (!session) {
    redirect("/auth/signin");
  }

  if (session?.user?.role === "user") {
    redirect("/");
  }

  //get product to pass in as default value
  const res = await fetch(`${baseURL}/api/product/${paramReq.id}`);
  const data = await res.json();

  return (
    <div className="w-full min-h-dvh pt-22">
      <ProfileNav />
      <EditProductMain product={data.product} />
    </div>
  );
};

export default page;
