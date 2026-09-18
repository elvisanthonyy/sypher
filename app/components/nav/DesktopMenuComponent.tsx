"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface ChildProps {
  name: string;
}

const DesktopMenuComponent = ({ name }: ChildProps) => {
  const { data: session, status } = useSession();
  return (
    <div className="hidden md:flex gap-2 items-center text-[14px] text-text">
      <Link className="w-full" href={"/"}>
        <div className="w-full transition-all duration-500 ease-in px-4 py-1 rounded-[32px] hover:bg-primary-400 hover:text-white px-4 shrink-0 gap-6 flex items-center">
          Home
        </div>
      </Link>

      <Link
        className="w-full"
        href={`/profile/${encodeURI(session?.user?.name)}`}
      >
        <div className="w-full  transition-all duration-500 ease-in px-4 py-1 rounded-[32px] hover:bg-primary-400 hover:text-white px-4 gap-6 shrink-0 flex items-center">
          Profile
        </div>
      </Link>

      <Link className="w-full" href={"/product/orders"}>
        <div className="w-full  transition-all duration-500 ease-in px-4 py-1 rounded-[32px] hover:bg-primary-400 hover:text-white  shrink-0 flex items-center">
          Orders
        </div>
      </Link>

      <Link
        className={`w-full ${name === "admin" ? "hidden" : "block"}`}
        href={`/user/admin`}
      >
        <div className="w-full  transition-all duration-500 ease-in px-4 py-1 rounded-[32px] hover:bg-primary-400 hover:text-white shrink-0 flex items-center">
          Admin
        </div>
      </Link>
      <Link
        className={`w-full ${name !== "admin" ? "hidden" : "block"}`}
        href={`/user/admin`}
      >
        <div className="w-full transition-all duration-500 ease-in px-4 py-1 rounded-[32px] hover:bg-primary-400 hover:text-white border-b border-border shrink-0  flex items-center">
          All Products
        </div>
      </Link>
    </div>
  );
};

export default DesktopMenuComponent;
