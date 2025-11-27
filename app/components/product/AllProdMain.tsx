"use client";
import { IProduct } from "@/models/product";
import AdminProduct from "./AdminProduct";

interface ChildProps {
  products: IProduct[];
}

const AllProdMain = ({ products }: ChildProps) => {
  return (
    <div>
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
