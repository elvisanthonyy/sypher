"use client";
import Link from "next/link";
import AdminDetailsComp from "./AdminDetailsComp";
import ButtonIcon from "./ButtonIcon";

interface ChildProps {
  details: {
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
  };
}

const AdminMain = ({ details }: ChildProps) => {
  return (
    <div className="w-full flex flex-col gap-4 px-4">
      {/* Website details section */}
      <section className="bg-primary-500 flex flex-col gap-8 rounded-[16px] p-4">
        <h1 className="text-[18px] font-semibold text-[#FDF8F7]">
          Website details
        </h1>
        <div className="flex flex-wrap gap-2 flex-col">
          <AdminDetailsComp
            label="Total Products"
            value={details.totalProducts}
          />
          <AdminDetailsComp label="Total Orders" value={details.totalOrders} />
          <AdminDetailsComp label="Total Users" value={details.totalUsers} />
        </div>
      </section>

      {/* Actions section */}
      <section className="flex flex-col gap-3">
        <h1 className="text-[18px] font-semibold border-b border-border pb-2 text-text">
          Actions
        </h1>
        <div className="flex w-full text-[14px] flex-col gap-3 p-4 bg-white border border-border rounded-[20px]">
          <Link className={``} href={`/product/allproducts`}>
            <div className="w-fit text-white px-6 gap-2 shrink-0 h-10 bg-text rounded-[8px] flex items-center">
              <p>View all Products</p>

              <ButtonIcon size={20} icon="/icons/all-product-icon.svg" />
            </div>
          </Link>
          <Link className={`w-full flex`} href={`/product/upload`}>
            <div className="w-fit text-text px-6 gap-2 shrink-0 h-10 border border-text rounded-[8px] flex items-center">
              <p>Upload Product</p>
              <ButtonIcon size={20} icon="/icons/upload-product-icon.svg" />
            </div>
          </Link>
          <Link className={`w-full flex`} href={`/user/admin/orders`}>
            <div className="w-fit text-white px-6 gap-2 shrink-0 h-10 bg-gradient-to-r from-[#19AECC] to-[#14879F] rounded-[8px] flex items-center">
              <p>View all Orders</p>
              <ButtonIcon size={20} icon="/icons/all-orders-icon.svg" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminMain;
