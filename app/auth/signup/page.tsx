import Form from "@/app/components/Form";
import { title } from "process";

export const metadata = {
  title: "Sign Up",
};

const page = () => {
  return (
    <div className="w-full flex-col h-dvh flex justify-center items-center">
      <Form />
    </div>
  );
};

export default page;
