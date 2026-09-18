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
  const splitPrice = product?.price?.toString().split("");

  return (
    <div
      onClick={() => router.replace(`/one/product/${product._id}`)}
      className={`flex text-text pb-1 md:pb-0 cursor-pointer justify-start gap-3 items-center flex-col md:bg-white md:rounded-[8px] md:border md:border-[#d8d8d8] md:flex-row md:h-[180px] w-41.5 md:w-[400px]`}
    >
      <div className="shrink-0 rounded-[8px] overflow-hidden flex justify-center items-center w-full md:w-[50%] md:h-full aspect-square bg-border">
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
      <div className="flex relative gap-1 md:h-full md:py-2 flex-col h-fit w-full">
        <div className="flex h-fit pt-4 justify-between items-center w-full">
          <div className="font-semibold flex items-center text-[16px] text-secondary-700">{`₦${product?.price?.toLocaleString()}`}</div>
          <div className="md:absolute md:bottom-2 md:left-0 flex md:items-center bg-[#f2f2f2] md:p-1 md:pl-2 rounded-[32px] gap-2">
            <p className="hidden md:flex text-[12px]">Available Units</p>
            <div className="text-[8px] text-white bg-text w-5 aspect-square flex justify-center items-center md:bg-primary-400 rounded-full">{`${Number(product?.unitsAvailable)}`}</div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-[14px] font-semibold flex ">{product?.name}</h1>

          <div className="text-[14px]">{product?.category}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
