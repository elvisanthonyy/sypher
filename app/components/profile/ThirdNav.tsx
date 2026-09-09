"use client";
import Menu from "../nav/Menu";
import { useRouter } from "next/navigation";
import BackButton from "../BackButton";

interface ChildProps {
  pageName?: string;
}

const ThirdNav = ({ pageName }: ChildProps) => {
  const router = useRouter();
  return (
    <div className="w-full md:px-[128px] bg-white flex justify-between px-5 items-center absolute top-0 left-0 h-[64px] border-border border-b">
      <div className="flex items-center gap-3">
        <BackButton />
        <h1 className="text-[16px] font-medium">{pageName}</h1>
      </div>
      <Menu />
    </div>
  );
};

export default ThirdNav;
