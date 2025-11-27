import ForgetPassMain from "@/app/components/forget/ForgetPassMain";
import { title } from "process";

export const metadata = {
  title: "Forgot Password",
};

const page = () => {
  return (
    <div className="w-full min-h-dvh flex flex-col justify-center items-center">
      <ForgetPassMain />
    </div>
  );
};

export default page;
