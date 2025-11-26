import { IOrder } from "@/models/order";

interface ChildProps {
  order: IOrder;
}

const OrderComp = ({ order }: ChildProps) => {
  const orderedAt = new Date(order?.createdAt);
  return (
    <>
      <div>{order?.name}</div>
      <div>{order?.email}</div>
      <div>{order?.productName}</div>
      <div>{order?.price}</div>
      <div>{order?.qty}</div>
      <div>{orderedAt.toLocaleDateString("en-GB")}</div>
    </>
  );
};

export default OrderComp;
