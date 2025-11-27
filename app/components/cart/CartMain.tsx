"use client";

import { useCart } from "@/app/context/CartContext";
import CartProductItem from "./CartProductItem";

const CartMain = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="w-full flex-col min-h-[80dvh] flex pt-18">
      <div className="w-full h-15 mb-2 justify-between px-6 border-b flex items-center">
        <div className="w-fit">Your Cart Items</div>
        <div
          onClick={clearCart}
          className="w-20 rounded-2xl bg-black text-white h-10 flex justify-center items-center"
        >
          Clear
        </div>
      </div>

      {cart?.map((cartItem) => (
        <div className="mb-4" key={cartItem?._id}>
          <CartProductItem
            cartItem={cartItem}
            removeFromCart={() =>
              removeFromCart(cartItem?._id, cartItem.productId)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default CartMain;
