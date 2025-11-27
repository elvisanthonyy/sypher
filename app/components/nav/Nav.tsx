import Cart from "../cart/Cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/libs/dbConnect";
import Link from "next/link";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Menu from "./Menu";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

interface ChildProps {
  name?: string;
}

const Nav = async ({ name }: ChildProps) => {
  // get user session
  await dbConnect();
  const session = await getServerSession(authOptions);

  return (
    <div className=" z-30 fixed bg-white top-0 text-sypher-light-text left-0 flex items-center justify-between px-[5%] w-full h-18 border-b border-b-sypher-light-darkBorder">
      <Menu name={name} userId={session?.user?.id} />
      <Link
        className={`cursor-pointer ${name === "profile" ? "hidden" : "flex"}`}
        href={"/"}
      >
        <div className="font-semibold">SYPHER</div>
      </Link>
      {session ? (
        <Link href={`/profile/${encodeURI(session?.user?.name)}`}>
          <div className="flex  items-center justify-center min-w-10  ">
            {name === "profile" && (
              <div className="mr-2">{session?.user?.name}</div>
            )}
            {session.user.role === "admin" ? (
              <RiAdminFill className="mr-5 text-3xl p-[3px] rounded-full px-px border-[1.7px]" />
            ) : name === "profile" ? (
              <RiVerifiedBadgeFill className="text-lg" />
            ) : (
              <FaUser className="text-lg" />
            )}
          </div>
        </Link>
      ) : (
        <Link href={"/auth/signin"}>
          <div className="cursor-pointer mr-3">Log in</div>
        </Link>
      )}

      <Cart />
    </div>
  );
};

export default Nav;
