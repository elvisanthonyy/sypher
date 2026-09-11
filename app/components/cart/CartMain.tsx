"use client";
import NoItemComponenet from "../NoItemComponenet";

import { useCart } from "@/app/context/CartContext";
import CartProductItem from "./CartProductItem";

const CartMain = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="w-full flex-col min-h-[80dvh] flex pt-[64px]">
      <section className="w-full md:px-[128px] bg-white h-[52px] justify-between px-4 border-b flex border-border items-center">
        <div
          onClick={clearCart}
          className="text-[14px] rounded-[32px] bg-text text-white px-4 py-2 flex justify-center items-center"
        >
          Clear
        </div>
      </section>

      {cart?.length > 0 ? (
        <section className="mt-3 flex flex-col gap-3 px-4">
          {cart?.map((cartItem) => (
            <CartProductItem
              forKey={cartItem?._id}
              cartItem={cartItem}
              removeFromCart={() =>
                removeFromCart(cartItem?._id, cartItem.productId)
              }
            />
          ))}
        </section>
      ) : (
        <section>
          <NoItemComponenet
            title="No Item in your cart"
            subTitle="Go home to add some items"
            buttonText="Continue Shopping"
            buttonLink="/"
          />
        </section>
      )}
    </div>
  );
};

export default CartMain;
