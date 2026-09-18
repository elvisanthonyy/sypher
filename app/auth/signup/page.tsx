import Form from "@/app/components/Form";
import Image from "next/image";

export const metadata = {
  title: "Sign Up",
};

const page = () => {
  return (
    <div className="w-full relative lg:flex-row overflow-x-hidden flex-col  h-dvh flex justify-start items-center">
      <div className="w-full lg:sticky overflow-hidden lg:bg-secondary-500 lg:order-first lg:h-dvh lg:w-[50%] relative flex-col text-3xl h-[25dvh] flex justify-end items-center">
        <div className="h-full lg:w-full lg:transform lg:-scale-x-100 relative lg:right-0 lg:top-0 -right-30">
          <Image
            src="/backgrounds/signin-rings-mobile.svg"
            width={1000}
            height={1000}
            alt="sign in image"
            className="block lg:hidden h-full"
          />
          <Image
            src="/backgrounds/sign-in-rings-desktop.svg"
            width={1000}
            height={1000}
            alt="sign in image"
            className="hidden lg:flex h-full md:w-full object-cover"
          />
        </div>
      </div>
      <Form />
    </div>
  );
};

export default page;
