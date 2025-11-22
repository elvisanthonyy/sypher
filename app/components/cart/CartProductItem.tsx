"use client";
import { CartItem } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

interface ChildProps {
  cartItem: CartItem;
  removeFromCart: () => void;
}

const CartProductItem = ({ cartItem, removeFromCart }: ChildProps) => {
  const router = useRouter();
  const total =
    cartItem?.price && cartItem?.qty ? cartItem?.price * cartItem?.qty : 0;
  return (
    <div className="flex mx-auto shrink-0 justify-start py-4 my-4 border-b border-b-sypher-light-border border-t border-t-sypher-light-border text-black items-center flex-col w-full h-110 bg-sypher-compGray">
      <div className="w-[90%] bg-sypher-light-border h-40 "></div>
      <div className="flex flex-col h-50 py-10 w-[90%]">
        <div>{cartItem?.name}</div>
        <div>{cartItem?.type}</div>
        <div>{cartItem?.category}</div>
        <div>{cartItem?.qty}</div>
        <div>{`Total: N${total},000.00`}</div>

        <div className="w-full ">
          <button
            onClick={() => router.push(`/product/order/${cartItem.productId}`)}
            className="cursor-pointer mr-5 py-2 px-5 my-5 text-black border rounded-2xl"
          >
            Order Now
          </button>
          <button
            onClick={removeFromCart}
            className="cursor-pointer py-2 px-5 my-5 text-black border rounded-2xl"
          >
            Remove to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
