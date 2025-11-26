"use client";
import { FiMenu, FiShoppingBag } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { RiHomeLine } from "react-icons/ri";
import { MdInventory } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { MdUpload } from "react-icons/md";

interface ChildProps {
  name: string | undefined;
  userId: string | undefined;
}

const Menu = ({ name, userId }: ChildProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="z-100 h-full  flex items-center relative">
      <div
        onClick={() =>
          isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
        }
        className=" flex z-120"
      >
        {isMenuOpen ? (
          <IoClose className="text-2xl" />
        ) : (
          <FiMenu className="text-2xl" />
        )}
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
          className={`bg-white w-[80%] h-full grid relative place-items-start text-gray-900 gap-y-5 auto-rows-min px-6 py-20 `}
        >
          <Link className="w-full" href={"/"}>
            <div className="w-full shrink-0 py-5 pt-8 border-t border-t-sypher-light-border h-7 flex items-center">
              <RiHomeLine className="mr-5 text-2xl" /> Home
            </div>
          </Link>

          <Link className="w-full" href={"/product/orders"}>
            <div className="w-full shrink-0 py-5  h-10 flex items-center">
              <MdInventory className="mr-5 text-2xl" /> Orders
            </div>
          </Link>

          <Link
            className={`w-full ${name === "admin" ? "hidden" : "block"}`}
            href={`/user/admin`}
          >
            <div className="w-full shrink-0 py-5 h-10 flex items-center">
              <RiAdminLine className="mr-5 text-[22px] rounded-full px-px border-2" />{" "}
              Admin
            </div>
          </Link>
          <Link
            className={`w-full ${name !== "admin" ? "hidden" : "block"}`}
            href={`/user/admin`}
          >
            <div className="w-full shrink-0 py-5 h-10 flex items-center">
              <FiShoppingBag className="mr-5 text-2xl" /> My Products
            </div>
          </Link>
          <Link className={`w-full flex`} href={`/product/upload`}>
            <div className="w-full shrink-0 py-5 pb-8 border-b border-b-sypher-light-border h-10 flex items-center">
              <MdUpload className="mr-5 border-2 rounded-sm text-xl text-sypher-light-text" />{" "}
              Upload Product
            </div>
          </Link>
          <div className=" w-full px-6 absolute bottom-10">
            <div className="w-full shrink-0 py-8 border-t border-t-sypher-light-border h-10 flex items-center">
              <FaUser className="mr-5 text-lg" /> Contact
            </div>
            <div
              onClick={() => signOut()}
              className="w-full  shrink-0 py-8 border-b border-b-sypher-light-border h-10 flex items-center"
            >
              <MdOutlineLogout className="mr-5 text-xl" /> Log Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
