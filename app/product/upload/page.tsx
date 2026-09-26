import ProductUploadMain from "@/app/components/productUpload/ProductUploadMain";
import AdminNav from "@/app/components/admin/AdminNav";
import { getSession } from "@/app/utils/getSession";
import dbConnect from "@/libs/dbConnect";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Upload Product as admin",
};

const page = async () => {
  await dbConnect();
  const session = await getSession();
  if (!session || session?.user?.role === "user") {
    redirect("/auth/admin/redirect");
  }
  return (
    <div className="w-full h-dvh pt-[80px]">
      <AdminNav />
      <ProductUploadMain />
    </div>
  );
};

export default page;
