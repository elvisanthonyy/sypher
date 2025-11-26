import { IOrder } from "@/models/order";

interface ChildProps {
  order: IOrder;
}

const AdminOrderComponent = ({ order }: ChildProps) => {
  const orderedAt = new Date(order.createdAt);
  return (
    <div className="w-full border border-sypher-light-darkBorder bg-blue-100/50 my-3 h-60 p-5 rounded-lg">
      <div className="border-b mb-2 py-2">{order?.name}</div>
      <div>{order?.email}</div>
      <div>{order?.productName}</div>
      <div>{order?.price}</div>
      <div>{order?.qty}</div>
      <div>{orderedAt.toLocaleDateString("en-GB")}</div>
    </div>
  );
};

export default AdminOrderComponent;
