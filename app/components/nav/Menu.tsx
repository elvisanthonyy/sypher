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
import Image from "next/image";

interface ChildProps {
  name: string | undefined;
  userId: string | undefined;
  role: string | undefined;
  userName: string | undefined;
}

const Menu = ({ name, userId, role, userName }: ChildProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="z-100 h-full mg:fixed md:top-0 left-0  flex items-center relative">
      <div
        onClick={() =>
          isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
        }
        className=" flex z-120 w-full"
      >
        {isMenuOpen ? (
          <IoClose className="text-2xl text-text" />
        ) : (
          <FiMenu className="text-2xl text-text" />
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
          className={`bg-white w-[80%] h-full grid relative place-items-start text-gray-900 gap-y-5 auto-rows-min px-6 py-18 `}
        >
          <Link className="w-full" href={"/"}>
            <div className="w-full pt-8  text-sypher-light-text shrink-0 py-5 gap-6 h-7 flex items-center">
              <div className="w-[20px] h-[20px]">
                <Image
                  src="/icons/home-icon.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                  className="w-full h-full"
                />
              </div>
              Home
            </div>
          </Link>
          {name !== "profile" && (
            <Link className="w-full" href={`/profile/${encodeURI(userName)}`}>
              <div className="w-full text-sypher-light-text gap-6 shrink-0 py-5  h-7 flex items-center">
                <div className="w-[20px] h-[20px]">
                  <Image
                    src="/icons/profile-icon.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                    className="w-full h-full"
                  />
                </div>{" "}
                Profile
              </div>
            </Link>
          )}

          <Link className="w-full" href={"/product/orders"}>
            <div className="w-full text-sypher-light-text shrink-0 py-5 gap-6 h-10 flex items-center">
              <div className="w-[20px] h-[20px]">
                <Image
                  src="/icons/orders-icon.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                  className="w-full h-full"
                />
              </div>{" "}
              Orders
            </div>
          </Link>

          <Link
            className={`w-full ${name === "admin" ? "hidden" : "block"}`}
            href={`/user/admin`}
          >
            <div className="w-full text-sypher-light-text shrink-0 py-5 gap-6 h-10 flex items-center">
              <div className="w-[20px] h-[20px]">
                <Image
                  src="/icons/admin-icon.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                  className="w-full h-full"
                />
              </div>{" "}
              Admin
            </div>
          </Link>
          <Link
            className={`w-full ${name !== "admin" ? "hidden" : "block"}`}
            href={`/user/admin`}
          >
            <div className="w-full text-sypher-light-text shrink-0 py-5 h-10 flex items-center">
              <FiShoppingBag className="mr-4 -ml-0.5 text-xl" /> All Products
            </div>
          </Link>
          {role === "admin" && <div></div>}

          <div className=" w-full flex justify-end px-6 absolute bottom-10">
            <div
              onClick={() => signOut()}
              className="w-fit text-[14px] bg-secondary-600 text-white shrink-0 py-2 px-6 gap-2 rounded-[32px] h-10 flex items-center"
            >
              Log Out
              <MdOutlineLogout className="text-[16px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
