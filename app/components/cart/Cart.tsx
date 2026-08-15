"use client";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { MdShoppingCart } from "react-icons/md";
import Image from "next/image";

const Cart = () => {
  const { cart } = useCart();
  return (
    <Link href={"/user/cart"}>
      <div className="flex h-10 w-7 relative items-center cursor-pointer">
        <div>
          <Image src="/icons/cart.svg" alt="Cart" width={24} height={24} />
        </div>
        <div className="text-[8px] text-white flex justify-center items-center rounded-full absolute -right-0.5 top-1 w-4 h-4 bg-primary-400">
          {cart?.length}
        </div>
      </div>
    </Link>
  );
};

export default Cart;
