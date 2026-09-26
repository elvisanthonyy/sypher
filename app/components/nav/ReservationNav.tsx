import Cart from "../cart/Cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/libs/dbConnect";
import Link from "next/link";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Menu from "./Menu";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import BackButton from "../BackButton";
import DesktopMenuComponent from "./DesktopMenuComponent";

interface ChildProps {
  name?: string;
  reservationNumber: number;
}

const ReservationNav = async ({ name, reservationNumber }: ChildProps) => {
  // get user session
  await dbConnect();
  const session = await getServerSession(authOptions);

  return (
    <div className=" z-30 fixed bg-white top-0 text-text left-0 flex items-center justify-between px-4 lg:px-[128px] w-full h-16 border-b border-b-border">
      <div className="flex items-center gap-4">
        <BackButton />
        {session ? (
          <Link href={`/profile/${encodeURI(session?.user?.name)}`}>
            <div className="flex gap-2 items-center justify-start">
              {name === "profile" && (
                <div className="text-[16px] font-medium text-text">
                  {session?.user?.name}
                </div>
              )}
            </div>
          </Link>
        ) : (
          <Link href={"/auth/signin"}>
            <div className="cursor-pointer mr-3"></div>
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2 justify-center">
        Reservations
        <span className="flex h-5 text-[12px] aspect-square rounded-full text-white items-center justify-center bg-primary-400">
          {reservationNumber}
        </span>
      </div>

      <Menu name={name} />
      <DesktopMenuComponent />
    </div>
  );
};

export default ReservationNav;
