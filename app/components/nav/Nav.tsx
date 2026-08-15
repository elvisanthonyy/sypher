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

interface ChildProps {
  name?: string;
}

const Nav = async ({ name }: ChildProps) => {
  // get user session
  await dbConnect();
  const session = await getServerSession(authOptions);

  return (
    <div className=" z-30 fixed bg-white top-0 text-text left-0 flex items-center justify-between px-[5%] w-full h-16 border-b border-b-border">
      <div className="flex items-center gap-4">
        <Menu
          name={name}
          userId={session?.user?.id}
          role={session?.user?.role}
          userName={session?.user?.name}
        />
        <Link
          className={`cursor-pointer ${name === "profile" ? "hidden" : "flex"}`}
          href={"/"}
        >
          <div className="w-fit flex items-center justify-center gap-2">
            <div className="w-[28px] flex aspect-square ">
              <Image
                src="/icons/logo.svg"
                alt="Logo"
                width={24}
                height={24}
                className="w-full w-full "
              />
            </div>

            <div className="font-semibold text-[16px]">Max Gadgets</div>
          </div>
        </Link>
      </div>

      {session ? (
        <Link href={`/profile/${encodeURI(session?.user?.name)}`}>
          <div className="flex  items-center justify-center min-w-10  ">
            {name === "profile" && (
              <div className="mr-2">{session?.user?.name}</div>
            )}
            {session.user.role === "admin" ? (
              <div className="w-[20px] flex aspect-square ">
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

      <Cart />
    </div>
  );
};

export default Nav;
