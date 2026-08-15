import Form from "@/app/components/Form";
import Image from "next/image";

export const metadata = {
  title: "Sign Up",
};

const page = () => {
  return (
    <div className="w-full overflow-hidden flex-col h-dvh flex  items-center">
      <div className="w-full  relative flex-col text-3xl h-[30dvh] flex justify-end items-center">
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
      <Form />
    </div>
  );
};

export default page;
