import { getSession } from "@/app/utils/getSession";
import dbConnect from "@/libs/dbConnect";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import UserOrdersMain from "@/app/components/usersOrders/UserOrdersMain";
import ProfileNav from "@/app/components/profile/ProfileNav";

const baseURL = process.env.BASE_URL;

export const metadata = {
  title: "All Users orders",
};

const page = async () => {
  await dbConnect();
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  const res = await fetch(`${baseURL}/api/order/getall`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
    body: JSON.stringify({ userId: session.user.id }),
  });
  const data = await res.json();
  console.log(data);
  return (
    <div className="w-full min-h-dvh pt-14">
      <ProfileNav />
      <UserOrdersMain orders={data.orders} />
    </div>
  );
};

export default page;
