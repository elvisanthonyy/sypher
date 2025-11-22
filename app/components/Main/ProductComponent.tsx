"use client";
import { IProduct } from "@/models/product";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Link from "next/link";
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
      className="flex text-black cursor-pointer border border-sypher-light-border my-2 justify-start py-4  items-center flex-col w-60 h-68 bg-sypher-light-compGray"
    >
      <div className="shrink-0 w-[90%] h-[50%] bg-gray-300"></div>
      <div className="flex text-sm my-5 flex-col h-[50%] px-1 w-[90%]">
        <h1>{product?.name}</h1>
        <div>{product?.type}</div>
        <div>{product?.category}</div>
        <div>{`Available: ${product?.unitsAvailable}`}</div>
        <div className="text-sm">{`N${product?.price},000.00`}</div>

        <div className="w-full "></div>
      </div>
    </div>
  );
};

export default ProductComponent;
