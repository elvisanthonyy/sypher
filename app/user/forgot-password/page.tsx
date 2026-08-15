import ForgetPassMain from "@/app/components/forget/ForgetPassMain";
import Image from "next/image";

export const metadata = {
  title: "Forgot Password",
};

const page = () => {
  return (
    <div className="w-full overflow-x-hidden px-4 min-h-dvh flex flex-col justify-start items-center">
      <div className="w-full  relative flex-col text-3xl h-[25dvh] flex justify-end items-center">
        <div className="h-full relative -right-30">
          <Image
            src="/backgrounds/signin-rings-mobile.svg"
            width={1000}
            height={1000}
            alt="sign in image"
            className="h-full"
          />
        </div>
      </div>
      <ForgetPassMain />
    </div>
  );
};

export default page;
