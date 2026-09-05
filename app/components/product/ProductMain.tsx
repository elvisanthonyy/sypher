"use client";
import OneProduct from "./OneProduct";
import { CartItem } from "@/app/context/CartContext";
import { useProductContext } from "@/app/context/ProductContext";
import { useEffect, useState } from "react";
import api from "@/libs/api";
import { IProduct } from "@/models/product";
import ProductComponent from "../Main/ProductComponent";

interface ChildProps {
  productProp: CartItem;
}

const ProductMain = ({ productProp }: ChildProps) => {
  const { setProduct } = useProductContext();
  const [products, setProducts] = useState<IProduct[]>();
  const getSimilarProducts = () => {
    api
      .post("/api/product/similar", {
        _id: productProp?._id,
        name: productProp?.name,
      })
      .then((res) => {
        setProducts(res.data.similarProducts);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  useEffect(() => {
    setProduct(productProp);
    getSimilarProducts();
  }, []);
  return (
    <div className="w-full min-h-[80dvh] flex flex-col gap-2 items-center pt-[64px]">
      <section className="px-4 w-full">
        <OneProduct />
      </section>

      <section className="flex w-full px-4 flex-col pt-2 border-border border-t">
        <h1 className="text-[16px] font-semibold text-text">
          Similar Products
        </h1>
        <div className="flex gap-2 pt-3 custom-scrollbar overflow-x-scroll justify-start items-center w-full ">
          {products?.map((product: IProduct, index: number) => (
            <div key={product._id.toString()} className={`flex}`}>
              <ProductComponent product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductMain;
