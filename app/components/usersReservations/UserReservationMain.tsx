"use client";
import { IReservation } from "@/models/Reservation";
import ReservationComp from "./ReservationComp";
import FilterButton from "./FilterButton";
import { useState } from "react";
import CompletedComponent from "../CompletedComponent";
import NoItemComponenet from "../NoItemComponenet";

interface ChildProps {
  reservation: IReservation[];
}

const filterButtons = ["all", "success", "pending", "cancelled"];

const UserReservationMain = ({ reservation }: ChildProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div>
      <div className="w-full bg-white font-semibold border-sypher-light-border custom-scrollbar gap-3 overflow-x-scroll px-5 lg:px-[128px] h-15 border-b mb-3 items-center justify-start flex">
        {filterButtons.map((btn, index) => (
          <FilterButton
            label={btn}
            key={index.toString()}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        ))}
      </div>
      {reservation?.length > 0 ? (
        <section className="">
          <div className="min-h-[60dvh] lg:grid lg:grid-cols-3  flex flex-col px-4 lg:px-[128px] gap-2">
            {reservation?.map((reservation: IReservation) => (
              <ReservationComp
                key={reservation._id.toString()}
                selectedFilter={selectedFilter}
                reservation={reservation}
              />
            ))}
          </div>
        </section>
      ) : (
        <section>
          <NoItemComponenet
            title="No Reservation yet"
            subTitle="Go to cart add make Reservation"
            buttonText="Cart"
            buttonLink="/user/cart"
          />
        </section>
      )}
    </div>
  );
};

export default UserReservationMain;
