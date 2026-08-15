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
      className="flex text-text cursor-pointer justify-start pb-4 gap-4  items-center flex-col w-41.5 "
    >
      <div className="shrink-0 rounded-[8px]  overflow-hidden flex justify-center items-center w-full aspect-square bg-border">
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
      <div className="flex text-sm flex-col h-[50%] w-full">
        <div className="flex h-fit justify-between items-start w-full pr-1">
          <div className="font-semibold text-[16px] text-secondary-700">{`₦${Number(
            product?.price,
          )}.00`}</div>
          <div className="text-[8px] text-white bg-text w-5 h-auto aspect-square flex justify-center items-center rounded-full">{`${Number(product?.unitsAvailable)}`}</div>
        </div>

        <h1 className="text-[14px] font-semibold">{product?.name}</h1>

        <div className="text-[14px]">{product?.category}</div>

        <div className="w-full "></div>
      </div>
    </div>
  );
};

export default ProductComponent;
