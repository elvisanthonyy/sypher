"use client";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  // get user session
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/auth/signin")}
      className="w-fit hidden lg:flex text-[14px] bg-primary-400 text-white shrink-0 py-2 px-6 gap-2 cursor-pointer tracking-[-2%] rounded-[32px] lg:h-9 h-10  items-center"
    >
      Sign In
    </button>
  );
};

export default SignInButton;
