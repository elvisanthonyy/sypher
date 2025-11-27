"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/libs/api";
import { CartItem } from "@/app/context/CartContext";
import { useEffect } from "react";

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
  console.log(cartItem);
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

  useEffect(() => {}, []);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (user?.role !== "user") {
      alert("you are the admin");
    }

    api
      .post("/api/order/product", {
        ...data,
        userId: user?.id,
        itemId: cartItem?.productId,
      })
      .then((res) => {})
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <div>
      <form
        onClick={handleSubmit(onSubmit)}
        className="flex w-full flex-col px-5"
      >
        <input
          {...register("name", {
            required: "name is required",
          })}
          className="border px-4 my-2 h-12 rounded-lg"
          type="text"
          disabled
        />
        <input
          {...register("email", {
            required: "email is required",
          })}
          className="border px-4 my-2 h-12 rounded-lg"
          type="text"
          disabled
        />

        <input
          {...register("productName", {
            required: "productName is required",
          })}
          className="border px-4 my-2 h-12 rounded-lg"
          type="text"
          disabled
        />
        <input
          {...register("price", {
            required: "price is required",
          })}
          className="border px-4 my-2 h-12 rounded-lg"
          type="text"
          disabled
        />
        <input
          {...register("qty", {
            required: "qty is required",
          })}
          className="border px-4 my-2 h-12 rounded-lg"
          type="text"
          disabled
        />
        <input
          {...register("location", {
            required: "location is required",
          })}
          placeholder="Enter Address"
          className="border px-4 my-2 h-12 rounded-lg"
          type="text"
        />
        <button className="bg-black h-12 rounded-lg my-2 text-white">
          Order
        </button>
      </form>
    </div>
  );
};

export default OrderMain;
