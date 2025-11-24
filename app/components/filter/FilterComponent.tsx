"use client";

import { useState } from "react";
import { MainRange } from "../Main/Main";

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
    <div className="w-full h-13 px-[10%] border-b border-b-sypher-light-darkBorder fixed flex text-sypher-light-text justify-between items-center top-20 left-0 z-20 bg-white">
      <div className="">Filter by price </div>
      <div>-</div>
      <select
        value={range}
        onChange={(e) => setRangeValues(e.target.value)}
        className="flex justify-center text-sm px-3 border w-40 h-8 rounded-lg"
      >
        <option value="0-10000000000" className="text-black" defaultChecked>
          none
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
      </select>
    </div>
  );
};

export default FilterComponent;
