"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  // get user session
  const router = useRouter();
  return (
    <button
      onClick={() => signOut()}
      className="w-fit active:opacity-50 hover:opacity-70 transition-all ease-in duration-500 hidden lg:flex text-[14px] bg-primary-400 text-white shrink-0 py-2 px-6 gap-2 cursor-pointer tracking-[-2%] rounded-[32px] lg:h-8 h-10  items-center"
    >
      Log Out
    </button>
  );
};

export default SignOutButton;
