import { IOrder } from "@/models/order";
import ProgressBtnComp from "./ProgressBtnComp";
import Modal from "../Modal";
import { useState } from "react";
import api from "@/libs/api";
import { useRouter } from "next/navigation";

interface ChildProps {
  order: IOrder;
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

const OrderComp = ({ order, selectedFilter }: ChildProps) => {
  const router = useRouter();
  const orderedAt = new Date(order?.createdAt);
  //getting present btn
  const progressBtn = progressBtns.find(
    (el) => el.label === order?.status.at(-1),
  );

  //variable to open and close delete modal
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  //cancel order api
  const cancelOrdeApi = () => {
    api
      .put(`/api/order/cancel/${order?._id}`, { orderId: order?._id })
      .then((res) => {
        if (res.data.status === "okay") {
          setIsCancelModalOpen(false);
          router.refresh();
        } else {
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
        className={`w-full gap-4 text-[14px] p-4 bg-white border rounded-[20px] min-h-60 ${selectedFilter === "all" || selectedFilter === progressBtn.label ? "flex" : "hidden"} flex-col justify-start border-sypher-light-border`}
      >
        <Modal
          title={
            order?.status.at(-1) === "cancelled"
              ? "Restart Order!"
              : "Cancel Order!!"
          }
          subTitle={
            order?.status.at(-1) === "cancelled"
              ? "You are about to restart order"
              : "Are you sure you want to cancel order?"
          }
          cancelButtonTitle={
            order?.status.at(-1) === "cancelled" ? "Cancel" : "No"
          }
          actionButtonTitle={
            order?.status.at(-1) === "cancelled" ? "Restart" : "Cancel"
          }
          api={cancelOrdeApi}
          isDeleteModalOpen={isCancelModalOpen}
          setIsDeleteModalOpen={setIsCancelModalOpen}
        />
        {/*<div className="border-b text-md mb-3 border-b-sypher-light-border">
          {`Order ID - ${order?._id}`}
        </div>*/}
        <section className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="w-full text-[16px] text-text font-semibold flex items-center">
              <div className="text-sypher-light-text">{order.name}</div>
            </div>
            <div className="w-full text-[12px] flex items-center">
              <div className="text-[#b4b4b4]">{order.email}</div>
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
            <div className="font-semibold">{order.productName}</div>
          </div>
          <div className="w-full justify-between flex items-center">
            <div className="text-[#868686]">Total Price:</div>
            <div className="font-semibold">{`₦${order.price},000.00`}</div>
          </div>
          <div className="w-full justify-between flex items-center">
            <div className="text-[#868686]">Quantity:</div>
            <div className="font-semibold">{`${order.qty}`}</div>
          </div>
          <div className="w-full justify-between flex items-center">
            <div className="text-[#868686]">Date Ordered:</div>
            <div className="font-semibold">{`${orderedAt.toLocaleDateString(
              "en-GB",
            )}`}</div>
          </div>
        </section>
        <section className="w-full flex justify-end">
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className={`px-10 ${order?.status.at(-1) === "success" ? "hidden" : "flex"} items-center cursor-pointer h-[31px] text-[12px] bg-primary-400 text-white rounded-[16px]`}
          >
            {order?.status.at(-1) === "cancelled" ? "Restart" : "cancel"}
          </button>
        </section>
      </div>
    </>
  );
};

export default OrderComp;
