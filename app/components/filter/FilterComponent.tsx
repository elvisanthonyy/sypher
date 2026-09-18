"use client";

import { useState } from "react";
import { MainRange } from "../Main/Main";
import { FaAngleDown } from "react-icons/fa";

interface ChildProps {
  mainRange: MainRange;
  setMainRange: React.Dispatch<React.SetStateAction<MainRange>>;
}

//values for select
const values = [
  { label: "All", value: "0-10000000000" },
  { label: "N100k - N200k", value: "100000-200000" },
  { label: "N200k - N350k", value: "200000-350000" },
  { label: "N350k - N500k", value: "350000-500000" },
  { label: "N500k - 1M", value: "500000-1000000" },
  { label: "1M - 3M", value: "1000000-3000000" },
];

const FilterComponent = ({ setMainRange }: ChildProps) => {
  const [range, setRange] = useState("");
  const setRangeValues = (e: string) => {
    setRange(e);
    setMainRange((prev) => ({ ...prev, start: Number(e.split("-")[0]) }));
    setMainRange((prev) => ({ ...prev, end: Number(e.split("-")[1]) }));
  };
  return (
    <div className="w-full h-auto border-b border-b-border px-4 md:px-[128px] py-2 r fixed flex text-sypher-light-text justify-between items-center top-16 left-0 z-20 bg-white">
      <div className="h-fit md:max-w-80 w-full justify-start relative flex justify-center">
        <select
          value={range}
          onChange={(e) => setRangeValues(e.target.value)}
          className="flex appearance-none justify-center h-[44px] focus:outline-0 text-sm px-4 bg-sypher-light-compGray border-sypher-light-border md:max-w-80 w-full h-8 rounded-[16px]"
        >
          {/*Map values to options*/}
          {values.map((value, index) => [
            <option
              key={index}
              value={value.value}
              className="text-text text-[14px] rounded-[16px]"
              defaultChecked={value.label === "All"}
            >
              {value.label}{" "}
            </option>,
          ])}
        </select>
        <FaAngleDown className="absolute right-3 text-sm top-[50%] -translate-y-[50%] pointer-events-none" />
      </div>
    </div>
  );
};

export default FilterComponent;
