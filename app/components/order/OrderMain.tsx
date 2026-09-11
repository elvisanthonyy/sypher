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
import ButtonIcon from "../admin/ButtonIcon";
import { error } from "console";
import FilterButton from "../usersOrders/FilterButton";

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

  // variable for message when task is carried out
  const [messageStatus, setMessageStatus] = useState("");
  const [totalPrice, setTotalPrice] = useState(cartItem.qty * cartItem.price);
  const [orderQuantity, setOrderQuantity] = useState<number>(
    cartItem?.qty ?? 1,
  );
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      productName: cartItem?.name,
      price: totalPrice,
      qty: orderQuantity,
    },
  });
  const router = useRouter();

  //increase quantity
  const increaseQuantity = () => {
    if (orderQuantity <= total) {
      setOrderQuantity((prev) => prev + 1);
    }
  };

  //decrease quantity
  const decreaseQuantity = () => {
    if (orderQuantity > 1) {
      setOrderQuantity((prev) => prev - 1);
    }
  };

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
          setMessageStatus("okay");
          router.push(`/product/order/${cartItem?.productId}?status=done`);
        }
      })
      .catch((error) => {
        console.error("error", error);
        setMessageStatus("error");
      });
  };

  return (
    <section>
      {status ? (
        <CompletedComponent
          status={status}
          title={status === "error" ? "something went wrong" : "Order Placed!"}
          subTitle={
            status === "error"
              ? "Your order couldn't be placed, please try again"
              : "Your order has been placed successfully, check your email for more details"
          }
          buttonTitle={status === "error" ? "retry" : "Orders"}
          buttonLink="/product/orders"
          errorButtonAction={() => router.back()}
        />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-3 w-full text-text text-[14px] flex-col px-5"
        >
          <section className="p-3 flex justify-between gap-2 border border-primary-100 bg-white h-[138px] rounded-[20px]">
            <div className="flex gap-3 w-full">
              <div className="h-full overflow-hidden aspect-square rounded-[8px]">
                <Image
                  src={cartItem?.image?.url}
                  height={1000}
                  width={1000}
                  alt="product image"
                  className="h-full"
                  draggable={false}
                />
              </div>
              <div className="flex flex-col h-full">
                <p>{cartItem.name}</p>
                <p>{cartItem.category}</p>
                <h1 className="font-bold mt-3 text-[16px] text-secondary-700">
                  N{cartItem.price.toLocaleString()}
                </h1>
              </div>
            </div>
            <div className="flex w-[53px] py-3 flex flex-col items-center justify-between h-full bg-background rounded-[8px] font-semibold">
              <div onClick={increaseQuantity}>
                <ButtonIcon size={16} icon="/icons/plus.svg" />
              </div>
              <div
                {...register("qty", {
                  required: "Quantity is required",
                })}
                id="qty"
                className="flex font-semibold items-end "
              >
                {orderQuantity}
              </div>
              <div onClick={decreaseQuantity}>
                <ButtonIcon size={16} icon="/icons/minus.svg" />
              </div>
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
                  {...register("email", {
                    required: "Email is required",
                  })}
                  id="name"
                  className="flex font-semibold items-end "
                >
                  {user.email}
                </div>
              </div>
            </div>
          </section>
          <section className="h-full flex flex-col p-4 gap-4 bg-white border border-border rounded-[20px]">
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
                  {`₦${cartItem.price.toLocaleString()}`}
                </div>
              </div>
              <div className="flex border-t border-border pt-2 font-semibold justify-between">
                <label className="" htmlFor="name">
                  Total Price
                </label>
                <h3>{`₦${totalPrice.toLocaleString()}`}</h3>
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
