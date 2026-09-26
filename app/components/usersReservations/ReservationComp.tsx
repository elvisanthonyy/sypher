import { IReservation } from "@/models/Reservation";
import ProgressBtnComp from "./ProgressBtnComp";
import Modal from "../Modal";
import { useState } from "react";
import api from "@/libs/api";
import { useRouter } from "next/navigation";

interface ChildProps {
  reservation: IReservation;
  selectedFilter: string;
}

const progressBtns = [
  {
    label: "pending",
    iconUrl: "/icons/pending.svg",
    color: "#FFDE00",
  },
  {
    label: "success",
    iconUrl: "/icons/success.svg",
    color: "#2db92d",
  },
  {
    label: "cancelled",
    iconUrl: "/icons/cancelled.svg",
    color: "#ff2a00",
  },
  {
    label: "unknown",
    iconUrl: "",
    color: "#dddddd",
  },
];

const ReservationComp = ({ reservation, selectedFilter }: ChildProps) => {
  const router = useRouter();
  const reservedAt = new Date(reservation?.createdAt);
  //getting present btn
  const progressBtn = progressBtns.find(
    (el) => el.label === reservation?.status.at(-1),
  );

  //variable to open and close delete modal
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  //cancel reserve api
  const cancelOrdeApi = () => {
    api
      .put(`/api/reservation/cancel/${reservation?._id}`, {
        reservationId: reservation?._id,
      })
      .then((res) => {
        if (res.data.status === "okay") {
          setIsCancelModalOpen(false);
          router.refresh();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const fallBack = progressBtns.at(-1);
  return (
    <>
      <div
        className={`w-full gap-4 text-[14px] p-4 bg-white border rounded-[20px] h-fit ${selectedFilter === "all" || selectedFilter === progressBtn.label ? "flex" : "hidden"} flex-col justify-start border-border`}
      >
        <Modal
          title={
            reservation?.status.at(-1) === "cancelled"
              ? "Restart Reserver!"
              : "Cancel Reserver!!"
          }
          subTitle={
            reservation?.status.at(-1) === "cancelled"
              ? "You are about to restart reservatioins"
              : "Are you sure you want to cancel reservation?"
          }
          cancelButtonTitle={
            reservation?.status.at(-1) === "cancelled" ? "Cancel" : "No"
          }
          actionButtonTitle={
            reservation?.status.at(-1) === "cancelled" ? "Restart" : "Cancel"
          }
          api={cancelOrdeApi}
          isDeleteModalOpen={isCancelModalOpen}
          setIsDeleteModalOpen={setIsCancelModalOpen}
        />
        {/*<div className="border-b text-md mb-3 border-b-sypher-light-border">
          {`Order ID - ${reserve?._id}`}
        </div>*/}
        <section className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="w-full text-[16px] text-text font-semibold flex items-center">
              <div className="text-sypher-light-text">{reservation.name}</div>
            </div>
            <div className="w-full text-[12px] flex items-center">
              <div className="text-[#b4b4b4]">{reservation.email}</div>
            </div>
          </div>

          <ProgressBtnComp
            label={progressBtn ? progressBtn?.label : fallBack.label}
            colour={progressBtn ? progressBtn?.color : fallBack.color}
            iconUrl={progressBtn ? progressBtn?.iconUrl : "/icons"}
          />
        </section>

        <section className="flex rounded-[16px] flex-col gap-1 border-border">
          <div className="w-full justify-between flex items-center">
            <div className="text-[#868686]">Product Name:</div>
            <div className="font-semibold">{reservation.productName}</div>
          </div>
          <div className="w-full justify-between flex items-center">
            <div className="text-[#868686]">Total Price:</div>
            <div className="font-semibold">{`₦${reservation.price.toLocaleString()}.00`}</div>
          </div>
          <div className="w-full justify-between flex items-center">
            <div className="text-[#868686]">Quantity:</div>
            <div className="font-semibold">{`${reservation.qty}`}</div>
          </div>
          <div className="w-full justify-between flex items-center">
            <div className="text-[#868686]">Date Ordered:</div>
            <div className="font-semibold">{`${reservedAt.toLocaleDateString(
              "en-GB",
            )}`}</div>
          </div>
        </section>
        <section className="w-full flex justify-end">
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className={`px-10 ${reservation?.status.at(-1) === "success" ? "hidden" : "flex"} items-center cursor-pointer tracking-[-2%] h-[31px] text-[12px] bg-primary-400 text-white rounded-[16px]`}
          >
            {reservation?.status.at(-1) === "cancelled" ? "Restart" : "cancel"}
          </button>
        </section>
      </div>
    </>
  );
};

export default ReservationComp;
