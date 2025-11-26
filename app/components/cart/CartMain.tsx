"use client";

import { useCart } from "@/app/context/CartContext";
import CartProductItem from "./CartProductItem";

const CartMain = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="w-full flex-col min-h-[80dvh] flex ">
      <div className="my-3 mt-6">Your Cart Items</div>
      {cart?.map((cartItem) => (
        <div className="my-4" key={cartItem?._id}>
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
