import { getSession } from "@/app/utils/getSession";
import dbConnect from "@/libs/dbConnect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminOrderMain from "@/app/components/reservation/AdminReservationMain";
import AdminNav from "@/app/components/admin/AdminNav";

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

  const res = await fetch(`${baseURL}/api/reservation/admin/getall`, {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });

  const data = await res.json();

  return (
    <div className="w-full h-dvh pt-[64px] flex flex-col">
      <AdminNav
        pageName="Orders"
        reservationNumber={data?.allReservations?.length}
      />
      <AdminOrderMain reservations={data?.allReservations} />
    </div>
  );
};

export default page;
