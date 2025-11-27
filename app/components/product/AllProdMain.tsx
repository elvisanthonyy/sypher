"use client";
import { IProduct } from "@/models/product";
import AdminProduct from "./AdminProduct";

interface ChildProps {
  products: IProduct[];
}

const AllProdMain = ({ products }: ChildProps) => {
  return (
    <div>
      <div className="w-full bg-white font-semibold text-sypher-light-text border-sypher-light-border px-5 h-11 border-b mb-3 items-center justify-end flex">
        All Products:{" "}
        <span className="ml-2 bg-blue-400 h-7 text-white text-sm w-fit min-w-7 flex justify-center items-center rounded-full">
          {products ? products?.length : "0"}
        </span>
      </div>
      <div className="bg-none">
        {products?.map((product) => (
          <div key={product._id} className="relative">
            <AdminProduct product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProdMain;
