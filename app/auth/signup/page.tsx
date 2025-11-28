import Form from "@/app/components/Form";
import { title } from "process";

export const metadata = {
  title: "Sign Up",
};

const page = () => {
  return (
    <div className="w-full flex-col h-dvh flex  items-center">
      <div className="w-full flex-col font-semibold text-white bg-linear-to-br from-blue-600 to-blue-400 text-3xl h-[30%] mb-10 flex justify-center items-center">
        <div>UC DOM</div>
        <p className="text-sm font-medium border-t">Computers</p>
      </div>
      <Form />
    </div>
  );
};

export default page;
