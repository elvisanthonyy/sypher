"use client";
import { IOrder } from "@/models/order";
import AdminOrderComponent from "./AdminOrderComponent";

interface ChildProps {
  orders: IOrder[];
}

const AdminOrderMain = ({ orders }: ChildProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-white font-semibold text-sypher-light-text border-sypher-light-border px-5 h-11 border-b mb-4 items-center justify-end flex">
        Total Users Orders:{" "}
        <span className="ml-2 bg-blue-400 h-6 text-white text-sm w-6 flex justify-center items-center rounded-full">
          {orders ? orders.length : "0"}
        </span>
      </div>
      <div className="w-full flex flex-col items-center">
        {orders?.map((order: IOrder) => (
          <div className="w-[95%] " key={order._id}>
            <AdminOrderComponent order={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderMain;
