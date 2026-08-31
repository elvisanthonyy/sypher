import Nav from "./components/nav/Nav";
import Link from "next/link";

const notFound = () => {
  return (
    <div>
      <Nav />
      <main className="flex items-center justify-center h-screen w-full flex-col gap-5">
        <h1 className="font-bold px-8 rounded-[32px] text-[120px] bg-primary-50 text-primary-400">
          404
        </h1>
        <p className="px-10 text-[14px]">
          The page you're looking for can not be found
        </p>
        <Link href={"/"}>
          <button className="text-[14px] cursor-pointer bg-text text-white px-4 py-2 rounded-[32px]">
            Home
          </button>
        </Link>
      </main>
    </div>
  );
};

export default notFound;
