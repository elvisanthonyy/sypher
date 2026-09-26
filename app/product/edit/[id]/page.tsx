import EditProductMain from "@/app/components/edit/EditProductMain";
import AdminNav from "@/app/components/admin/AdminNav";
import { getSession } from "@/app/utils/getSession";
import { redirect } from "next/navigation";

//get base url
const baseURL = process.env.BASE_URL;

//upadate title
export async function generateMetadata({ params }) {
  const reqBody = await params;
  return {
    title: `Delete product ${decodeURI(reqBody.id)}`,
  };
}

//page to edit product
const page = async ({ params }: { params: { id: string } }) => {
  //check if user is logged in
  const session = await getSession();
  const paramReq = await params;

  if (!session) {
    redirect("/auth/signin");
  }

  //check if user is an admin
  if (session?.user?.role === "user") {
    redirect("/");
  }

  //get product to pass in as default value
  const res = await fetch(`${baseURL}/api/product/${paramReq.id}`);
  const data = await res.json();

  return (
    <div className="w-full min-h-dvh pt-22">
      <AdminNav />
      <EditProductMain product={data.product} />
    </div>
  );
};

export default page;
