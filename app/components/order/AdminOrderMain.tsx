"use client";
import { IOrder } from "@/models/order";
import AdminOrderComponent from "./AdminOrderComponent";

interface ChildProps {
  orders: IOrder[];
}

const AdminOrderMain = ({ orders }: ChildProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col px-5">
        {orders?.map((order: IOrder) => (
          <div key={order._id}>
            <AdminOrderComponent order={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderMain;
