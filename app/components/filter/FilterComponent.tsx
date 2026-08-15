"use client";

import { useState } from "react";
import { MainRange } from "../Main/Main";
import { FaAngleDown } from "react-icons/fa";

interface ChildProps {
  mainRange: MainRange;
  setMainRange: React.Dispatch<React.SetStateAction<MainRange>>;
}

const FilterComponent = ({ setMainRange }: ChildProps) => {
  const [range, setRange] = useState("");
  const setRangeValues = (e: string) => {
    setRange(e);
    setMainRange((prev) => ({ ...prev, start: Number(e.split("-")[0]) }));
    setMainRange((prev) => ({ ...prev, end: Number(e.split("-")[1]) }));
  };
  return (
    <div className="w-full h-auto border-b border-b-border px-4 py-2 r fixed flex text-sypher-light-text justify-between items-center top-16 left-0 z-20 bg-white">
      <div className="h-fit w-full relative flex justify-center">
        <select
          value={range}
          onChange={(e) => setRangeValues(e.target.value)}
          className="flex appearance-none justify-center h-[44px] focus:outline-0 text-sm px-4 bg-sypher-light-compGray border-sypher-light-border  w-full h-8 rounded-[16px]"
        >
          <option
            value="0-10000000000"
            className="text-text text-[14px] rounded-[16px]"
            defaultChecked
          >
            Filter by price
          </option>
          <option value="100000-200000" className="text-black">
            N100k - N200k
          </option>
          <option value="200000-350000" className="text-black">
            N200k - N350k
          </option>
          <option value="350000-500000" className="text-black">
            N350k - N500k
          </option>
          <option value="500000-1000000" className="text-black">
            N500k - 1M
          </option>
          <option value="1000000-2000000" className="text-black">
            1M - 2M
          </option>
        </select>
        <FaAngleDown className="absolute right-3 text-sm top-[50%] -translate-y-[50%] pointer-events-none" />
      </div>
    </div>
  );
};

export default FilterComponent;
