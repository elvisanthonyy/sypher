"use client";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { MdShoppingCart } from "react-icons/md";

const Cart = () => {
  const { cart } = useCart();
  return (
    <Link href={"/user/cart"}>
      <div className="flex h-10 w-7 relative items-center cursor-pointer">
        <div>
          <MdShoppingCart className="text-2xl" />
        </div>
        <div className="text-[10px] flex justify-center items-center rounded-full absolute right-0 top-0 w-4 h-4 bg-blue-500">
          {cart?.length}
        </div>
      </div>
    </Link>
  );
};

export default Cart;
