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

interface ChildProps {
  name?: string;
  ordersNumber: number;
}

const NavOrder = async ({ name, ordersNumber }: ChildProps) => {
  // get user session
  await dbConnect();
  const session = await getServerSession(authOptions);

  return (
    <div className=" z-30 fixed bg-white top-0 text-text left-0 flex items-center justify-between px-[5%] w-full h-16 border-b border-b-border">
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
              {session.user.role === "admin" ? (
                <div className="w-[20px] hidden flex aspect-square ">
                  <Image
                    src="/icons/admin-icon.svg"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="w-full w-full text-white"
                  />
                </div>
              ) : name === "profile" ? (
                <RiVerifiedBadgeFill className="text-lg" />
              ) : (
                <FaUser className="text-lg" />
              )}
            </div>
          </Link>
        ) : (
          <Link href={"/auth/signin"}>
            <div className="cursor-pointer mr-3"></div>
          </Link>
        )}
      </div>
      <div className="flex gap-2">
        <div className="text-[16px] font-semibold">Orders</div>
        <div className="text-[12px] flex h-[24px] aspect-square items-center justify-center bg-primary-400 text-white rounded-full">
          {ordersNumber}
        </div>
      </div>
      <Menu name={name} />
    </div>
  );
};

export default NavOrder;
