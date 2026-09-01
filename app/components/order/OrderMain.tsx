"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/libs/api";
import { CartItem } from "@/app/context/CartContext";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CompletedComponent from "../CompletedComponent";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface FormFields {
  name: string;
  email: string;
  productName: string;
  price: number;
  qty: number;
  location: string;
}

interface ChildProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  cartItem: CartItem;
}

const OrderMain = ({ user, cartItem }: ChildProps) => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const total = (cartItem?.price ?? 0) * (cartItem?.qty ?? 0);
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      productName: cartItem?.name,
      price: total,
      qty: cartItem?.qty,
    },
  });
  const router = useRouter();

  useEffect(() => {}, []);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    api
      .post("/api/order/product", {
        ...data,
        userId: user?.id,
        itemId: cartItem?.productId,
      })
      .then((res) => {
        if (res.data.status === "okay") {
          router.push(`/product/order/${cartItem?.productId}?status=done`);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <section>
      {status ? (
        <CompletedComponent
          title="Order Placed!"
          subTitle="Your order has been placed successfully,
        check your email for more details"
          buttonTitle="Orders"
          buttonLink="/"
        />
      ) : (
        <form
          onClick={handleSubmit(onSubmit)}
          className="flex gap-3 w-full text-text text-[14px] flex-col px-5"
        >
          <section className="p-3 flex gap-2 border border-primary-100 bg-white h-[138px] rounded-[20px]">
            <div className="h-full overflow-hidden aspect-square rounded-[8px]">
              <Image
                src={cartItem.image.url}
                height={1000}
                width={1000}
                alt="product image"
                className="h-full"
                draggable={false}
              />
            </div>
            <div className="flex flex-col h-full">
              <p>{cartItem.name}</p>
              <h1>{cartItem.price}</h1>
            </div>
          </section>

          {/* user details */}
          <section className="h-full flex pb-8 flex-col p-4 gap-4 bg-white border border-border rounded-[20px]">
            <h1 className="w-full text-[16px] font-semibold pb-2 border-b border-border">
              User Details
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <label className="text-[#b4b4b4]" htmlFor="name">
                  Name
                </label>
                <div
                  {...register("name", {
                    required: "name is required",
                  })}
                  id="name"
                  className="flex font-semibold items-end "
                >
                  {cartItem.name}
                </div>
              </div>
              <div className="flex justify-between">
                <label className="text-[#b4b4b4]" htmlFor="name">
                  Email
                </label>
                <div
                  {...register("name", {
                    required: "name is required",
                  })}
                  id="name"
                  className="flex font-semibold items-end "
                >
                  {user.email}
                </div>
              </div>
            </div>
          </section>
          <section className="h-full flex pb-8 flex-col p-4 gap-4 bg-white border border-border rounded-[20px]">
            <h1 className="w-full text-[16px] font-semibold pb-2 border-b border-border">
              Order Details
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <label className="text-[#b4b4b4]" htmlFor="name">
                  Quantity
                </label>
                <div
                  {...register("name", {
                    required: "name is required",
                  })}
                  id="name"
                  className="flex font-semibold items-end "
                >
                  {cartItem.qty}
                </div>
              </div>
              <div className="flex justify-between">
                <label className="text-[#b4b4b4]" htmlFor="name">
                  Price
                </label>
                <div
                  {...register("name", {
                    required: "name is required",
                  })}
                  id="name"
                  className="flex font-semibold items-end "
                >
                  {cartItem.price}
                </div>
              </div>
            </div>
          </section>

          <button className="bg-primary-400 cursor-pointer h-12 rounded-[8px] my-2 text-white">
            Order
          </button>
        </form>
      )}
    </section>
  );
};

export default OrderMain;
