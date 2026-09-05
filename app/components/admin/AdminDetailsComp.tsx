import React from "react";

interface ChildProps {
  label: string;
  value: string | number;
}

const AdminDetailsComp = ({ label, value }: ChildProps) => {
  return (
    <div className="flex text-[14px] w-fit pr-4 rounded-[32px] text-[#FDF8F7] h-7 bg-primary-400 items-center text-white gap-2">
      <div className="h-full aspect-square border border-white flex items-center justify-center rounded-full bg-primary-500">
        {value}
      </div>
      <div>{label}</div>
    </div>
  );
};

export default AdminDetailsComp;
