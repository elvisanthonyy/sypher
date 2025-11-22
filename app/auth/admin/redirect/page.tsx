import Link from "next/link";

const page = () => {
  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <div>You are not an admin</div>
      <div>
        <Link
          href={"/auth/admin/signin"}
          className="ml-2 underline text-blue-700"
        >
          Sigin
        </Link>{" "}
        as admin or go
        <Link href={"/"} className="ml-2 underline text-blue-700">
          home
        </Link>{" "}
      </div>
    </div>
  );
};

export default page;
