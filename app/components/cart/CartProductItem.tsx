"use client";
import { CartItem } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ChildProps {
  cartItem: CartItem;
  forKey: string;
  removeFromCart: () => void;
}

const CartProductItem = ({ cartItem, removeFromCart, forKey }: ChildProps) => {
  const router = useRouter();
  const total =
    cartItem?.price && cartItem?.qty ? cartItem?.price * cartItem?.qty : 0;
  return (
    <div
      key={forKey}
      className="flex rounded-[20px] mx-auto p-3 gap-4 shrink-0 bg-white justify-start border border-border text-black items-center flex-col w-full bg-sypher-compGray"
    >
      <section className="h-[94px] border-border rounded-[8px] bg-[#fafafa] flex w-full items-center gap-4">
        <div className="h-full aspect-square rounded-[8px] overflow-hidden border-b border-b-sypher-light-darkBorder bg-sypher-light-border h-45 ">
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
        <div>
          <div className="text-[16px] tracking-tight text-secondary-700 font-semibold">{`N${total.toLocaleString()}`}</div>
          <div className="text-[#b4b4b4] text-[14px]">{cartItem?.name}</div>
        </div>
      </section>

      <section className="w-full border-t border-border pt-2 flex gap-2 items-center">
        <button
          onClick={() =>
            router.push(
              `/product/order/${cartItem.productId ? cartItem.productId : cartItem._id}`,
            )
          }
          className="w-full cursor-pointer h-[34px] bg-text text-[14px] text-white border rounded-[16px]"
        >
          Order
        </button>
        <button
          onClick={removeFromCart}
          className="w-full cursor-pointer h-[34px] bg-primary-400 text-[14px] text-white border rounded-[16px]"
        >
          Delete
        </button>
      </section>
    </div>
  );
};

export default CartProductItem;
