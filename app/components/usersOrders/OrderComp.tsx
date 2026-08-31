import { IOrder } from "@/models/order";

interface ChildProps {
  order: IOrder;
}

const OrderComp = ({ order }: ChildProps) => {
  const orderedAt = new Date(order?.createdAt);
  return (
    <>
      <div className="w-full gap-4 text-[14px] p-4 bg-white border rounded-[20px] min-h-60 flex flex-col justify-start border-sypher-light-border">
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
          <div className="text-[12px] px-[32px] py-[8px] border rounded-[32px]">
            Pending
          </div>
        </section>

        <section className="flex border-t pt-2 flex-col gap-2 border-border">
          <div className="w-full justify-between flex items-center">
            <div className="text-[#b4b4b4]">Product Name:</div>
            <div className="font-semibold">{order.productName}</div>
          </div>
          <div className="w-full justify-between flex items-center">
            <div className="text-[#b4b4b4]">Total Price:</div>
            <div className="font-semibold">{`₦${order.price},000.00`}</div>
          </div>
          <div className="w-full justify-between flex items-center">
            <div className="text-[#b4b4b4]">Quantity:</div>
            <div className="font-semibold">{`${order.qty}`}</div>
          </div>
          <div className="w-full justify-between flex items-center">
            <div className="text-[#b4b4b4]">Date Ordered:</div>
            <div className="font-semibold">{`${orderedAt.toLocaleDateString(
              "en-GB",
            )}`}</div>
          </div>
        </section>
        <section>
          <button className="px-10 py-3 text-[12px] bg-primary-400 text-white rounded-[16px]">
            Cancel Order
          </button>
        </section>
      </div>
    </>
  );
};

export default OrderComp;
