import ResetPassMain from "@/app/components/forget/ResetPassMain";

export const metadata = {
  title: "Reset Password",
};

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const sp = await searchParams;
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <ResetPassMain token={sp?.token} />
    </div>
  );
};

export default page;
