import { IOrder } from "@/models/order";
import ProgressBtnComp from "../usersOrders/ProgressBtnComp";

interface ChildProps {
  order: IOrder;
  selectedFilter: string;
}

const progressBtns = [
  {
    label: "pending",
    iconUrl: "/icons/pending.svg",
    color: "#f4d63e",
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

const AdminOrderComponent = ({ order, selectedFilter }: ChildProps) => {
  const orderedAt = new Date(order.createdAt);

  const progressBtn = progressBtns.find(
    (el) => el.label === order?.status.at(-1),
  );

  const fallBack = progressBtns.at(-1);
  return (
    <div
      className={`w-full gap-4 text-[14px] p-4 bg-white border rounded-[20px] min-h-60 ${selectedFilter === "all" || selectedFilter === progressBtn.label ? "flex" : "hidden"} flex-col justify-start border-sypher-light-border`}
    >
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

      <section className="flex bg-[#fafafa] p-2 rounded-[16px] flex-col gap-1 border-border">
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
        <button className="px-10 h-[31px] text-[12px] bg-primary-400 text-white rounded-[16px]">
          Cancel Order
        </button>
      </section>
    </div>
  );
};

export default AdminOrderComponent;
