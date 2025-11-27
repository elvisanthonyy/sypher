"use client";
import { useState, useEffect } from "react";
import { useProductContext } from "@/app/context/ProductContext";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";

// component to display product when clicked
const OneProduct = () => {
  const { product } = useProductContext();
  const { addToCart, cart } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [qty, setQty] = useState<number | undefined>(1);

  useEffect(() => {
    const checkCart = cart?.find(
      (i) => i.productId === product?._id || i._id === product?._id
    );

    if (checkCart) {
      setIsInCart(true);
      setQty(checkCart?.qty);
    } else {
      setIsInCart(false);
    }
  }, [product]);
  return (
    <div className="flex w-[95%] text-black border border-sypher-light-border my-2 justify-start py-4  items-center flex-col h-115">
      <div className="shrink-0 overflow-hidden border-b border-b-sypher-light-border w-full h-50 bg-gray-300">
        {product?.image?.url && (
          <Image
            height={300}
            width={500}
            alt="product image"
            src={product?.image?.url}
            className="w-[105%] h-full object-cover"
          />
        )}
      </div>
      <div className="flex text-sm my-5 bg-am flex-col h-[50%] px-1 w-[95%] ">
        <div className="w-full flex mb-1 justify-between">
          <div>{product?.name}</div>
          <div className="italic">{product?.category}</div>
        </div>

        <div className="text-lg font-semibold">
          {product?.price && `₦${product?.price}.00`}
        </div>

        <div className="w-full border-b mb-4 border-b-sypher-light-border py-2">
          Specs
        </div>
        <div>
          Core i5
          <br />
          6th Gen
          <br />
          500GB SSD
          <br />
          Keyboard light
          <br />
          Windows 10 pro
        </div>

        {isInCart ? (
          <div className="fixed bottom-10 left-[50%]  border border-sypher-light-darkBorder bg-white -translate-x-[50%] w-[95%] h-18 py-3 rounded-lg px-5 flex justify-between items-center ">
            <div
              onClick={() => (qty ?? 0) > 1 && setQty((qty ?? 0) - 1)}
              className="flex justify-center items-center text-lg aspect-square h-[90%] rounded-lg bg-black text-white"
            >
              -
            </div>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              min={1}
              max={2}
              maxLength={2}
              className="border h-[90%] rounded-lg aspect-square w-15 text-center"
              disabled
            />
            <div
              onClick={() =>
                (qty ?? 0) < (product?.unitsAvailable ?? 0) &&
                setQty((qty ?? 0) + 1)
              }
              className="flex justify-center items-center text-lg aspect-square h-[90%] rounded-lg border border-black"
            >
              +
            </div>
          </div>
        ) : (
          <div
            onClick={() => addToCart({ ...product, qty })}
            className="fixed bottom-10 left-[50%] -translate-x-[50%] w-[95%] text-white h-13 rounded-lg flex justify-center items-center bg-blue-700"
          >
            Add to Cart
          </div>
        )}
      </div>
    </div>
  );
};

export default OneProduct;
