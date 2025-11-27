import SigninForm from "@/app/components/SigninForm";

export const metadata = {
  title: "Log In",
};

const page = () => {
  return (
    <div className="w-full  h-dvh flex justify-center items-center">
      <SigninForm />
    </div>
  );
};

export default page;
