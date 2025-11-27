import { IOrder } from "@/models/order";

interface ChildProps {
  order: IOrder;
}

const OrderComp = ({ order }: ChildProps) => {
  const orderedAt = new Date(order?.createdAt);
  return (
    <>
      <div className="w-[95%] mb-3 bg-white border rounded-lg h-60 px-5 pt-6 flex flex-col justify-start border-sypher-light-border">
        <div className="border-b text-md mb-3 border-b-sypher-light-border">
          {`Order ID - ${order?._id}`}
        </div>
        <div className="w-full mb-1 text-sm flex items-center">
          <div className="mr-2 font-semibold text-sypher-light-text">Name:</div>
          <div className="text-sypher-light-text">{order.name}</div>
        </div>
        <div className="w-full mb-1 text-sm flex items-center">
          <div className="mr-2 font-semibold text-sypher-light-text">
            Email:
          </div>
          <div className="text-sypher-light-text">{order.email}</div>
        </div>
        <div className="w-full mb-1 text-sm flex items-center">
          <div className="mr-2 font-semibold text-sypher-light-text">
            Product Name:
          </div>
          <div className="text-sypher-light-text">{order.productName}</div>
        </div>
        <div className="w-full mb-1 text-sm flex items-center">
          <div className="mr-2 font-semibold text-sypher-light-text">
            Total Price:
          </div>
          <div className="text-sypher-light-text">{`₦${order.price}.00`}</div>
        </div>
        <div className="w-full mb-1 text-sm flex items-center">
          <div className="mr-2 font-semibold text-sypher-light-text">
            Quantity:
          </div>
          <div className="text-sypher-light-text">{`${order.qty}`}</div>
        </div>
        <div className="w-full mb-1 text-sm flex items-center">
          <div className="mr-2 font-semibold text-sypher-light-text">
            Date Ordered:
          </div>
          <div className="text-sypher-light-text">{`${orderedAt.toLocaleDateString(
            "en-GB"
          )}`}</div>
        </div>
      </div>
    </>
  );
};

export default OrderComp;
