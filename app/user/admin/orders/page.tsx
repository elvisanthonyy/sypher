import { getSession } from "@/app/utils/getSession";
import dbConnect from "@/libs/dbConnect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminOrderMain from "@/app/components/order/AdminOrderMain";
import NavOrder from "@/app/components/nav/NavOrder";

const baseURL = process.env.BASE_URL;
const page = async () => {
  await dbConnect();
  const session = await getSession();
  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user.role === "user") {
    redirect("/auth/admin/redirect");
  }

  const res = await fetch(`${baseURL}/api/order/admin/getall`, {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });

  const data = await res.json();
  console.log(data);

  return (
    <div className="w-full h-dvh pt-[64px] flex flex-col">
      <NavOrder ordersNumber={data.allOrders.length} />
      <AdminOrderMain orders={data.allOrders} />
    </div>
  );
};

export default page;
