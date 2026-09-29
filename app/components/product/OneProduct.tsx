"use client";
import { useState, useEffect } from "react";
import { useProductContext } from "@/app/context/ProductContext";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

const specs = ["Core i5", "6th Gen", "500GB SSD", "Keyboard light"];

// component to display product when clicked
const OneProduct = () => {
  const router = useRouter();
  const { product } = useProductContext();
  const { addToCart, cart, increaseQty, reduceQty } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [qty, setQty] = useState<number | undefined>(1);

  useEffect(() => {
    //check if user already has item in cart
    const checkCart = cart?.find(
      (i) => i.productId === product?._id || i._id === product?._id,
    );

    //set variables when item is in cart
    if (checkCart) {
      setIsInCart(true);
      setQty(checkCart?.qty);
    } else {
      setIsInCart(false);
    }
  }, [product, cart]);
  return (
    <div className="flex p-3 my-3 gap-2 w-full bg-white rounded-[16px] text-black border border-border justify-start pb-4 lg:flex-row items-center flex-col h-fit">
      <section className="shrink-0 rounded-[4px] overflow-hidden border-b border-b-border w-full lg:w-[375px] lg:h-[333px] min-h-50 bg-gray-300">
        {product?.image?.url && (
          <Image
            height={300}
            width={500}
            alt="product image"
            src={product?.image?.url}
            className="w-[105%] h-full object-cover"
          />
        )}
      </section>
      <section className="flex lg-py-4 lg:w-full lg:w-[50%] lg:items-center lg:h-[333px] lg:gap-6 lg:flex-row px-2 flex-col h-[50%] w-full ">
        <div className="flex lg:w-[50%] relative lg:justify-center lg:h-full lg:justify-between flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="text-[16px] text-text font-semibold">
              {product?.price && `₦${product?.price}.00`}
            </div>
            <div className="w-full text-[14px] text-[#77777] flex-col flex mb-1 justify-between">
              <div>{product?.name}</div>
              <div className="">{product?.category}</div>
              <div className="">
                {product?.unitsAvailable &&
                  `Units Available - ${product?.unitsAvailable}`}
              </div>
            </div>
          </div>
          <div className="fixed bg-white z-60 lg:absolute lg:bottom-0 lg:translate-x-0 lg:left-0 -translate-x-[50%] bottom-0 bg-white left-[50%] lg:px-0 px-5 md:px-[128px] lg:px-4 pt-3 pb-5 w-full">
            {isInCart ? (
              <div className="w-full h-18 rounded-lg flex justify-between items-center ">
                <button
                  onClick={() => {
                    const newQty = (qty ?? 0) - 1;
                    if ((qty ?? 0) > 1) {
                      setQty(newQty);
                      reduceQty(product?._id, newQty);
                    }
                  }}
                  className="flex cursor-pointer justify-center items-center text-lg aspect-square rounded-[8px] h-[36px] aspect-square bg-primary-400 text-white"
                >
                  -
                </button>
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
                <button
                  onClick={() => {
                    const newQty = (qty ?? 0) + 1;
                    if (newQty <= (product?.unitsAvailable ?? 0)) {
                      setQty(newQty);
                      increaseQty(product?._id, newQty);
                    }
                  }}
                  className="flex active:opacity-70 cursor-pointer justify-center items-center text-lg aspect-square rounded-[8px] h-[36px] aspect-square border border-border"
                >
                  +
                </button>
              </div>
            ) : (
              <div
                onClick={() => {
                  addToCart({ ...product, qty });
                }}
                className="text-white active:opacity-70 transition-all ease-in duration-500 cursor-pointer hover:opacity-70 h-[49px] text-[14px] rounded-[16px] flex justify-center items-center bg-primary-400"
              >
                Add to Cart
              </div>
            )}
          </div>
        </div>

        {/*<div
          className="grid grid-cols-2 lg:
        w-full lg:flex lg:flex-col lg:border-t-0 border-t border-border pt-4"
        >
          <h1 className="hidden mb-3 pb-3 lg:flex border-b border-border">
            Specifications
          </h1>
          {specs.map((spec, index) => (
            <div className="flex gap-2 items-center" key={index}>
              <div className="w-2 aspect-square rounded-full bg-primary-400"></div>
              <p className="text-text text-[14px]">{spec}</p>
            </div>
          ))}
        </div>*/}
      </section>
    </div>
  );
};

export default OneProduct;
