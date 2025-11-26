"use client";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { MdUpload, MdInventory } from "react-icons/md";

interface ChildProps {
  details: {
    totalProducts: number;
    totalOrders: number;
  };
}

const AdminMain = ({ details }: ChildProps) => {
  console.log(details);
  return (
    <div className="w-full px-5">
      <div className="h-15 flex text-sypher-light-darkBorder  items-end pb-3 border-b-sypher-light-border my-4 border-b">
        Products:{" "}
        <span className="ml-1 text-sypher-light-text">
          {details?.totalProducts && `${details?.totalProducts}`}
        </span>
      </div>
      <div className="h-15 flex text-sypher-light-darkBorder  items-end pb-3 border-b-sypher-light-border my-4 border-b">
        Orders:{" "}
        <span className="ml-1 text-sypher-light-text">
          {details?.totalOrders && `${details?.totalOrders}`}
        </span>
      </div>
      <div className="flex w-full  border-b border-b-sypher-light-border flex-col mt-15 min-h-50">
        <Link className={``} href={`/product/allproducts`}>
          <div className="w-full text-sypher-light-text shrink-0 py-5 my-1 h-15 flex items-center">
            <FiShoppingBag className="mr-5 text-2xl" /> My Products
          </div>
        </Link>
        <Link className={`w-full flex`} href={`/product/upload`}>
          <div className="w-full shrink-0 text-sypher-light-text py-5 my-1 h-15 flex items-center">
            <MdUpload className="mr-5 border rounded-sm text-xl text-sypher-light-text" />{" "}
            Upload Product
          </div>
        </Link>
        <Link className={`w-full flex`} href={`/product/upload`}>
          <div className="w-full shrink-0 text-sypher-light-text py-5 my-1 h-15 flex items-center">
            <MdInventory className="mr-5 text-xl text-sypher-light-text" /> All
            Orders
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminMain;
