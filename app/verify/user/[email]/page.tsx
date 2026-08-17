import VerifyMain from "@/app/components/verify/VerifyMain";
import Image from "next/image";

const page = async ({ params }: { params: { email: string } }) => {
  const paramsBody = await params;

  return (
    <div className="w-fill h-dvh flex px-4 flex-col justify-start relative overflow-hidden items-center">
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
      <VerifyMain email={decodeURIComponent(paramsBody.email)} />;
    </div>
  );
};

export default page;
