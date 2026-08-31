"use client";
import { IOrder } from "@/models/order";
import OrderComp from "./OrderComp";
import FilterButton from "./FilterButton";
import { useState } from "react";
import CompletedComponent from "../CompletedComponent";

interface ChildProps {
  orders: IOrder[];
}

const filterButtons = ["all", "success", "pending", "cancelled"];

const UserOrdersMain = ({ orders }: ChildProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div>
      <div className="w-full bg-white font-semibold border-sypher-light-border custom-scrollbar gap-3 overflow-x-scroll px-5 h-15 border-b mb-3 items-center justify-start flex">
        {filterButtons.map((btn, index) => (
          <FilterButton
            label={btn}
            key={index}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        ))}
      </div>
      <section className="">
        <div className="min-h-[60dvh] flex flex-col px-4 gap-2">
          {orders?.map((order: IOrder) => (
            <div
              className="w-full flex flex-col items-center"
              key={order?._id.toString()}
            >
              <OrderComp order={order} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserOrdersMain;
