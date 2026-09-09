import dbConnect from "@/libs/dbConnect";
import { getSession } from "@/app/utils/getSession";
import { redirect } from "next/navigation";
import ProfileNav from "@/app/components/profile/ThirdNav";
import AllProdMain from "@/app/components/product/AllProdMain";
import { cookies } from "next/headers";
import AdminNav from "@/app/components/admin/AdminNav";

const baseURL = process.env.BASE_URL;

export const metadata = {
  title: "All Products",
};

const page = async () => {
  await dbConnect();
  const session = await getSession();

  if (session?.user?.role === "user") {
    redirect("/");
  }

  const res = await fetch(`${baseURL}/api/product/allproducts`, {
    method: "GET",
    headers: {
      Cookie: (await cookies()).toString(),
    },
    cache: "no-store",
  });

  const data = await res.json();
  console.log(data);

  return (
    <div className="w-full flex flex-col min-h-dvh pt-[64px]">
      <AdminNav />
      <AllProdMain products={data.products} />
    </div>
  );
};

export default page;
