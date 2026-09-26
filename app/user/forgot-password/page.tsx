import ForgetPassMain from "@/app/components/forget/ForgetPassMain";
import Image from "next/image";
import NavTwo from "@/app/components/nav/NavTwo";

export const metadata = {
  title: "Forgot Password",
};

const page = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-dvh flex flex-col justify-start items-center">
      <NavTwo name="profile" />
      <div className="w-full relative flex-col text-3xl lg:h-[30dvh] h-[25dvh] flex justify-end items-center lg:items-end">
        <div className="h-full lg:aspect-square relative right-0">
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
