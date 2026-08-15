import Form from "@/app/components/Form";
import Image from "next/image";

export const metadata = {
  title: "Sign Up",
};

const page = () => {
  return (
    <div className="w-full overflow-hidden flex-col h-dvh flex  items-center">
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
        <div className="flex px-5 gap-2 items-center w-full mb-7">
          <div className="w-[46px] aspect-square">
            <Image
              src="/icons/logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>
          <div className="font-semibold tracking-tight px-2 text-[20px] text-text">
            Max Gadgets
          </div>
        </div>
      </div>
      <Form />
    </div>
  );
};

export default page;
