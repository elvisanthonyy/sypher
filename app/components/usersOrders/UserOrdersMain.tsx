"use client";
import { IOrder } from "@/models/order";
import OrderComp from "./OrderComp";

interface ChildProps {
  orders: IOrder[];
}

const UserOrdersMain = ({ orders }: ChildProps) => {
  return (
    <div>
      <div className="w-full bg-white font-semibold text-sypher-light-text border-sypher-light-border px-5 h-11 border-b mb-3 items-center justify-end flex">
        Orders:{" "}
        <span className="ml-2 bg-blue-400 h-6 text-white text-sm w-6 flex justify-center items-center rounded-full">
          {orders ? orders.length : "0"}
        </span>
      </div>
      <div className=" min-h-[60dvh]">
        {orders?.map((order: IOrder) => (
          <div className="w-full flex flex-col items-center" key={order?._id}>
            <OrderComp order={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrdersMain;
