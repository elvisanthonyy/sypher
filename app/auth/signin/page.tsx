import SigninForm from "@/app/components/SigninForm";

export const metadata = {
  title: "Log In",
};

const page = () => {
  return (
    <div className="w-full flex-col  h-dvh flex justify-start items-center">
      <div className="w-full flex-col font-semibold text-white bg-linear-to-br from-blue-600 to-blue-400 text-3xl h-[25%] mb-10 flex justify-center items-center">
        <div>UC DOM</div>
        <p className="text-sm font-medium border-t">Computers</p>
      </div>
      <SigninForm />
    </div>
  );
};

export default page;
