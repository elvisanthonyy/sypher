"use client";
import { IOrder } from "@/models/order";
import OrderComp from "./OrderComp";

interface ChildProps {
  orders: IOrder[];
}

const UserOrdersMain = ({ orders }: ChildProps) => {
  return (
    <div>
      <div>
        {orders?.map((order: IOrder) => (
          <div
            className="w-full h-50 flex flex-col items-center"
            key={order?._id}
          >
            <OrderComp order={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrdersMain;
