import AdminSigninMain from "@/app/components/admin/AdminSigninMain";

export const metadata = {
  title: "Sign In as Admin",
};

const page = () => {
  return (
    <div className="w-full flex-col h-dvh flex justify-center items-center">
      <div>Sign in as an admin</div>
      <AdminSigninMain />
    </div>
  );
};

export default page;
