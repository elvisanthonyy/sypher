"use client";
import { IProduct } from "@/models/product";
import AdminProduct from "./AdminProduct";
import { useEffect, useState } from "react";
import FilterButton from "../usersOrders/FilterButton";

interface ChildProps {
  products: IProduct[];
}

const filterButtons = ["all", "windows", "mac"];

const AllProdMain = ({ products }: ChildProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  //wto be able to update products is deleted
  const [stateProducts, setStateProducts] = useState<IProduct[]>();
  useEffect(() => {
    setStateProducts(products);
  });
  return (
    <div className="w-full flex flex-col gap-2 ">
      <div className="w-full bg-white font-semibold border-sypher-light-border custom-scrollbar gap-3 overflow-x-scroll px-5 h-15 border-b items-center justify-start flex">
        {filterButtons.map((btn, index) => (
          <FilterButton
            label={btn}
            key={index}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        ))}
      </div>
      <div className="gap-3 flex flex-col min-h-dvh w-full px-4">
        {stateProducts?.map((product) => (
          <AdminProduct
            product={product}
            setStateProducts={setStateProducts}
            stateProducts={stateProducts}
            selectedFilter={selectedFilter}
            forKey={product._id.toString()}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProdMain;
