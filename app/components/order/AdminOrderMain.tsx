"use client";
import { IOrder } from "@/models/order";
import AdminOrderComponent from "./AdminOrderComponent";
import { useState } from "react";
import FilterButton from "../usersOrders/FilterButton";

interface ChildProps {
  orders: IOrder[];
}

// To map filter buttons
const filterButtons = ["all", "success", "pending", "cancelled"];

const AdminOrderMain = ({ orders }: ChildProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-white font-semibold border-sypher-light-border custom-scrollbar gap-3 overflow-x-scroll px-5 h-15 border-b mb-3 items-center justify-start flex">
        {filterButtons.map((btn, index) => (
          <FilterButton
            label={btn}
            key={index.toString()}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        ))}
      </div>
      <div className="w-full gap-2 flex flex-col items-center">
        {orders?.map((order: IOrder) => (
          <div className="w-[95%] " key={order._id.toString()}>
            <AdminOrderComponent
              order={order}
              selectedFilter={selectedFilter}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderMain;
