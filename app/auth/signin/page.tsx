import SigninForm from "@/app/components/SigninForm";
import Image from "next/image";
export const metadata = {
  title: "Log In",
};

const page = () => {
  return (
    <div className="w-full flex-col  h-dvh flex justify-start items-center">
      <div className="w-full flex-col font-semibold text-white bg-linear-to-br from-blue-600 to-green-300 text-3xl h-[30%] mb-10 flex justify-center items-center">
        <Image
          src="/backgrounds/rings-mobile.svg"
          width={1000}
          height={1000}
          alt="sign in image"
        />
      </div>
      <SigninForm />
    </div>
  );
};

export default page;
