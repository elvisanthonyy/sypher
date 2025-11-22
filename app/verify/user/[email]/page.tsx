import VerifyMain from "@/app/components/verify/VerifyMain";

const page = async ({ params }: { params: { email: string } }) => {
  const paramsBody = await params;

  return (
    <div className="w-fill h-dvh flex justify-center items-center">
      <VerifyMain email={decodeURIComponent(paramsBody.email)} />;
    </div>
  );
};

export default page;
