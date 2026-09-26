"use client";
import { IReservation } from "@/models/Reservation";
import AdminOrderComponent from "./AdminReservationComponent";
import { useState } from "react";
import FilterButton from "../usersReservations/FilterButton";
import NoItemComponenet from "../NoItemComponenet";

interface ChildProps {
  reservations: IReservation[];
}

// To map filter buttons
const filterButtons = ["all", "success", "pending", "cancelled"];

const AdminOrderMain = ({ reservations }: ChildProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-white font-semibold border-sypher-light-border custom-scrollbar gap-3 lg:px-[128px] overflow-x-scroll px-5 h-15 border-b mb-3 items-center justify-start flex">
        {filterButtons.map((btn, index) => (
          <FilterButton
            label={btn}
            key={index.toString()}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        ))}
      </div>
      {reservations?.length > 0 ? (
        <div className="w-full lg:grid md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-[128px] gap-2 flex flex-col items-center">
          {reservations?.map((reservation: IReservation) => (
            <AdminOrderComponent
              key={reservation?._id.toString()}
              reservation={reservation}
              selectedFilter={selectedFilter}
            />
          ))}
        </div>
      ) : (
        <section>
          <NoItemComponenet
            title="No Reservation by and user yet"
            subTitle="Go back to Admin page"
            buttonText="Admin"
            buttonLink="/user/admin"
          />
        </section>
      )}
    </div>
  );
};

export default AdminOrderMain;
