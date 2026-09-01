"use client";
import { FiMenu, FiShoppingBag } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MenuIconComponent from "./MenuIconComponent";

interface ChildProps {
  name?: string;
}

const Menu = ({ name }: ChildProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session);

  return (
    <div className="z-100 h-full mg:fixed md:top-0 left-0  flex items-center relative">
      <div
        onClick={() => setIsMenuOpen(true)}
        className=" flex z-120 w-full left-0"
      >
        <FiMenu className="text-2xl text-text" />
      </div>
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`flex transition-all duration-500 ease-in-out fixed z-100 top-0 left-0 w-full h-dvh bg-black/30
          ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-100 opacity-0"
          }
        `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white w-[80%] h-full grid relative place-items-start text-gray-900 gap-y-5 auto-rows-min px-6 `}
        >
          <div
            className="w-full h-[64px] items-center flex "
            onClick={() => setIsMenuOpen(false)}
          >
            <IoClose className="text-2xl text-text" />
          </div>

          <Link className="w-full" href={"/"}>
            <div className="w-full pt-8  text-sypher-light-text shrink-0 py-5 gap-6 h-7 flex items-center">
              <MenuIconComponent iconUrl="/icons/home-icon.svg" />
              Home
            </div>
          </Link>

          <Link
            className="w-full"
            href={`/profile/${encodeURI(session?.user?.name)}`}
          >
            <div className="w-full text-sypher-light-text gap-6 shrink-0 py-5  h-7 flex items-center">
              <MenuIconComponent iconUrl="/icons/profile-icon.svg" />
              Profile
            </div>
          </Link>

          <Link className="w-full" href={"/product/orders"}>
            <div className="w-full text-sypher-light-text shrink-0 py-5 gap-6 h-10 flex items-center">
              <MenuIconComponent iconUrl="/icons/orders-icon.svg" />
              Orders
            </div>
          </Link>

          <Link
            className={`w-full ${name === "admin" ? "hidden" : "block"}`}
            href={`/user/admin`}
          >
            <div className="w-full text-sypher-light-text shrink-0 py-5 gap-6 h-10 flex items-center">
              <MenuIconComponent iconUrl="/icons/admin-icon.svg" />
              Admin
            </div>
          </Link>
          <Link
            className={`w-full ${name !== "admin" ? "hidden" : "block"}`}
            href={`/user/admin`}
          >
            <div className="w-full border-b border-border text-sypher-light-text shrink-0 py-5 h-10 flex items-center">
              <FiShoppingBag className="mr-4 -ml-0.5 text-xl" /> All Products
            </div>
          </Link>
          {session?.user?.role === "admin" && <div></div>}

          <div className=" w-full flex justify-end px-6 absolute bottom-10">
            {/*check if user is signed in and display the right button*/}
            {session ? (
              <div
                onClick={() => signOut()}
                className="w-fit text-[14px] bg-primary-400 text-white shrink-0 py-2 px-6 gap-2 cursor-pointer rounded-[32px] h-10 flex items-center"
              >
                Log Out
                <MdOutlineLogout className="text-[16px]" />
              </div>
            ) : (
              <div
                onClick={() => router.push("/auth/signin")}
                className="w-fit text-[14px] bg-primary-400 text-white shrink-0 py-2 px-6 gap-2 cursor-pointer rounded-[32px] h-10 flex items-center"
              >
                Sign In
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
