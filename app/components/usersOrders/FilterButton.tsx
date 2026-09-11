import { Abel } from "next/font/google";
import { useState } from "react";

interface ChildProps {
  selectedFilter: string;
  label: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

//select filter
const FilterButton = ({
  label,
  selectedFilter,
  setSelectedFilter,
}: ChildProps) => {
  //capitalize first letter
  const splitName = label.split("");
  const capitalizedFirst = [
    ...splitName[0].toUpperCase(),
    ...splitName.slice(1),
  ].join("");
  return (
    <div
      onClick={() => setSelectedFilter(label)}
      className={`px-8 transition-all ease-in duration-500 cursor-pointer border-border ${label === selectedFilter ? "bg-text text-white" : "text-text"} text-[14px] rounded-[32px] flex py-2 border`}
    >
      {capitalizedFirst}
    </div>
  );
};

export default FilterButton;
