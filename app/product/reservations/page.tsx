import { getSession } from "@/app/utils/getSession";
import dbConnect from "@/libs/dbConnect";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import UserReservationMain from "@/app/components/usersReservations/UserReservationMain";
import ReservationNav from "@/app/components/nav/ReservationNav";
import { User } from "@/models/user";

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

  const res = await fetch(`${baseURL}/api/reservation/getall`, {
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
    <div className="w-full min-h-dvh pt-16">
      <ReservationNav reservationNumber={data.reservation.length} />
      <UserReservationMain reservation={data.reservation} />
    </div>
  );
};

export default page;
