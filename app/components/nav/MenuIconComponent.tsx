"use client";
import Image from "next/image";

interface ChildProps {
  iconUrl: string;
}

const MenuIconComponent = ({ iconUrl }: ChildProps) => {
  return (
    <div className="bg-[#f5f5f5] rounded-[16px] h-[40px] aspect-square flex items-center justify-center">
      <div className="w-[20px] h-[20px]">
        <Image
          src={`${iconUrl}`}
          alt="Logo"
          width={20}
          height={20}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default MenuIconComponent;
