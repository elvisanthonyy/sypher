"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface ChildProps {
  name?: string;
}

const DesktopMenuComponent = ({ name }: ChildProps) => {
  const { data: session, status } = useSession();

  // Nav links
  const navLinks = [
    { label: "Home", link: "/" },
    { label: "Profile", link: `/profile/${encodeURI(session?.user?.name)}` },
    { label: "Reservations", link: "/product/reservations" },
    { label: "Admin", link: "/user/admin" },
  ];

  return (
    <div className="hidden md:flex gap-2 items-center text-[14px] text-text">
      {navLinks?.map((link, index) => (
        <Link
          key={index}
          className={`w-full ${name === "admin" && link.label === "Admin" ? "hidden" : "block"}`}
          href={link.link}
        >
          <div className="w-full transition-all duration-500 ease-in px-4 py-1 rounded-[32px] hover:bg-text hover:text-white px-4 shrink-0 gap-6 flex items-center">
            {link.label}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DesktopMenuComponent;
