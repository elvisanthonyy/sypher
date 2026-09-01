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
      className={`text-[12px] flex items-center gap-2 font-medium px-[8px] h-[26px] border rounded-[32px]`}
      style={{ borderColor: colour, color: colour }}
    >
      <div className="h-[12px] aspect-square">
        <Image
          src={`${iconUrl}`}
          height={30}
          width={30}
          alt={`${label}`}
          className="w-full"
          draggable={false}
        />
      </div>
      {label}
    </div>
  );
};

export default ProgressBtnComp;
