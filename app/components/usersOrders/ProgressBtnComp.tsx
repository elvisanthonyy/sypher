"use client";
import Image from "next/image";

interface ChildProps {
  label: string;
  iconUrl?: string;
  colour?: string;
}

const ProgressBtnComp = ({ label, iconUrl, colour }: ChildProps) => {
  const mainColour = `border-[${colour}]`;
  return (
    <div
      className={`text-[12px] flex items-center gap-2 font-medium px-[12px] h-[26px] rounded-[32px]`}
      style={{ backgroundColor: `${colour}20`, color: colour }}
    >
      {label}
    </div>
  );
};

export default ProgressBtnComp;
