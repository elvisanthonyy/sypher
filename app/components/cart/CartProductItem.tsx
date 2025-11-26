"use client";
import { CartItem } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ChildProps {
  cartItem: CartItem;
  removeFromCart: () => void;
}

const CartProductItem = ({ cartItem, removeFromCart }: ChildProps) => {
  const router = useRouter();
  const total =
    cartItem?.price && cartItem?.qty ? cartItem?.price * cartItem?.qty : 0;
  return (
    <div className="flex mx-auto shrink-0 bg-white justify-start py-4 my-4 border-b border-b-sypher-light-border border-t border-t-sypher-light-border text-black items-center flex-col w-full min-h-113 bg-sypher-compGray">
      <div className="w-full overflow-hidden border-b border-b-sypher-light-darkBorder bg-sypher-light-border h-45 ">
        {cartItem?.image?.url && (
          <Image
            height={100}
            width={200}
            alt="cart product image"
            src={cartItem.image.url}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col h-50 py-5 px-4 w-full">
        <div className="text-sypher-light-text">{cartItem?.name}</div>
        <div className="font-semibold">{`Total: N${total}.00`}</div>
        <div>{cartItem?.category}</div>
        <div className="text-sypher-light-text text-sm">
          {cartItem?.qty && `Quantity: ${cartItem?.qty}`}
        </div>

        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => router.push(`/product/order/${cartItem.productId}`)}
            className="w-full cursor-pointer py-2 mt-4 px-5 my-2 bg-black text-white border rounded-lg"
          >
            Order Now
          </button>
          <button
            onClick={removeFromCart}
            className="w-full cursor-pointer py-2 px-5 my-2 text-black border rounded-lg"
          >
            Remove to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
