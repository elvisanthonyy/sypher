"use client";
import { IProduct } from "@/models/product";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Image from "next/image";
import { MainRange } from "./Main";
import { useRouter } from "next/navigation";

interface ChildProps {
  product: IProduct;
  mainRange?: MainRange;
}

const ProductComponent = ({ product, mainRange }: ChildProps) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState<number>(1);
  const router = useRouter();
  return (
    <div
      onClick={() => router.replace(`/one/product/${product._id}`)}
      className="flex text-black cursor-pointer border border-sypher-light-border my-3 justify-start pb-4  items-center flex-col w-60 h-68 bg-white"
    >
      <div className="shrink-0 border-b border-b-sypher-light-border overflow-hidden flex justify-center items-center w-full h-42 bg-gray-300">
        {product?.image?.url && (
          <Image
            src={product.image?.url}
            height={150}
            width={250}
            alt="product image"
            className="h-full object-cover"
          ></Image>
        )}
      </div>
      <div className="flex text-sm my-2 flex-col h-[50%] px-3 w-full">
        <h1 className="text-[13px] ">{product?.name}</h1>
        <div className="text-xs mb-0.5 italic">{product?.category}</div>
        <div className="font-semibold text-[16px] mb-0.5 text-sypher-light-text">{`₦${Number(
          product?.price
        )}.00`}</div>

        <div className="">{`Available: ${Number(
          product?.unitsAvailable
        )}`}</div>

        <div className="w-full "></div>
      </div>
    </div>
  );
};

export default ProductComponent;
