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
      (i) => i.productId === product?._id || i._id === product?._id,
    );

    if (checkCart) {
      setIsInCart(true);
      setQty(checkCart?.qty);
    } else {
      setIsInCart(false);
    }
  }, [product]);
  return (
    <div className="flex p-3 my-3 gap-2 w-full bg-white rounded-[16px] text-black border border-border justify-start pb-4  items-center flex-col h-115">
      <div className="shrink-0 rounded-[4px] overflow-hidden border-b border-b-sypher-light-border w-full h-50 bg-gray-300">
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
      <div className="flex text-sm bg-am flex-col h-[50%] w-full ">
        <div className="text-[16px] text-text font-semibold">
          {product?.price && `₦${product?.price}.00`}
        </div>

        <div className="w-full flex mb-1 justify-between">
          <div>{product?.name}</div>
          <div className="italic">{product?.category}</div>
        </div>

        <div className="w-full border-b mb-2 border-b-sypher-light-border py-2">
          Specs
        </div>
        <div className="grid row-[1fr, 1fr]">
          <div>Core i5</div>

          <div>6th Gen</div>
          <div>500GB SSD</div>
          <div>Keyboard light</div>

          <div>Keyboard light</div>
        </div>

        <div className="fixed -translate-x-[50%] bottom-0 bg-white left-[50%] px-5 pt-3 pb-5 w-full">
          {isInCart ? (
            <div className="w-full h-18 rounded-lg flex justify-between items-center ">
              <div
                onClick={() => (qty ?? 0) > 1 && setQty((qty ?? 0) - 1)}
                className="flex justify-center items-center text-lg aspect-square rounded-[8px] h-[36px] aspect-square bg-primary-400 text-white"
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
                className="border border-border text-text aspect-square rounded-[8px] h-[36px] aspect-square text-center"
                disabled
              />
              <div
                onClick={() =>
                  (qty ?? 0) < (product?.unitsAvailable ?? 0) &&
                  setQty((qty ?? 0) + 1)
                }
                className="flex justify-center items-center text-lg aspect-square rounded-[8px] h-[36px] aspect-square border border-border"
              >
                +
              </div>
            </div>
          ) : (
            <div
              onClick={() => addToCart({ ...product, qty })}
              className="text-white h-[49px] rounded-[16px] flex justify-center items-center bg-primary-400"
            >
              Add to Cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneProduct;
