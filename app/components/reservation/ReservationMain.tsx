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
import { IProduct } from "@/models/product";

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
  product: IProduct;
}

//main component for reservation page
const ReservationMain = ({ user, cartItem, product }: ChildProps) => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  // variable for message when task is carried out
  const [messageStatus, setMessageStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderQuantity, setOrderQuantity] = useState<number>(
    cartItem?.qty ?? 1,
  );
  const [totalPrice, setTotalPrice] = useState(orderQuantity * cartItem.price);

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
    if (orderQuantity < Number(product.unitsAvailable)) {
      setOrderQuantity((prev) => prev + 1);
      setTotalPrice((prev) => prev + cartItem.price);
    }
  };

  //decrease quantity
  const decreaseQuantity = () => {
    if (orderQuantity > 1) {
      setOrderQuantity((prev) => prev - 1);
      setTotalPrice((prev) => prev - cartItem.price);
    }
  };

  useEffect(() => {}, []);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    api
      .post("/api/reservation/product", {
        ...data,
        userId: user?.id,
        productId: cartItem?.productId,
      })
      .then((res) => {
        if (res.data.status === "error") {
          return setErrorMessage(res.data.message);
        }
        if (res.data.status === "okay") {
          setMessageStatus("okay");
          router.push(
            `/product/reservation/${cartItem?.productId}?status=done`,
          );
        }
      })
      .catch((error) => {
        console.error("error", error);
        setMessageStatus("error");
      });
  };

  return (
    <section className="relative pt-[80px] min-h-dvh flex flex-col">
      {status ? (
        <CompletedComponent
          status={status}
          title={
            status === "error" ? "something went wrong" : "Reservation Made!"
          }
          subTitle={
            status === "error"
              ? "Your reservation couldn't be made, please try again"
              : "Your reservation has been made successfully, check your email for more details"
          }
          buttonTitle={status === "error" ? "retry" : "Reservations"}
          buttonLink="/product/reservations"
          errorButtonAction={() => router.back()}
        />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-3 lg:flex-row relative w-full text-text text-[14px] flex-col px-5 lg:px-[128px]"
        >
          <section className="p-3 flex justify-between gap-3 border border-primary-100 bg-white h-[138px] lg:h-auto lg:w-[50%] lg:aspect-square rounded-[20px]">
            <div className="flex gap-3 h-full">
              <div className="h-full overflow-hidden aspect-square rounded-[8px]">
                <Image
                  src={cartItem?.image?.url}
                  height={1000}
                  width={1000}
                  alt="product image"
                  className="h-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
            <div className="w-full  lg:rounded-[20px] lg:h-[calc(200px-12px)] lg:border lg:border-border lg:p-3 lg:absolute items-center lg:right-[128px] lg:top-0 lg:bg-white lg:w-[calc(50%-128px-8px)] flex justify-between">
              <div className="flex flex-col h-fit">
                <p>{cartItem.name}</p>
                <p>{cartItem.category}</p>
                <h1 className="font-bold  mt-3 text-[16px] text-secondary-700">
                  N{cartItem.price.toLocaleString()}
                </h1>
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
            </div>
          </section>

          <div className="w-full flex flex-col gap-4 lg:w-[50%]">
            {/* user details */}
            <section className="h-full lg:mt-[200px] lg:h-fit flex pb-8 flex-col p-4 gap-4 bg-white border border-border rounded-[20px]">
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
            <section className="h-full flex lg:h-fit flex-col p-4 gap-4 bg-white border border-border rounded-[20px]">
              <h1 className="w-full text-[16px] font-semibold pb-2 border-b border-border">
                Reservation Details
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <label className="text-[#b4b4b4]" htmlFor="name">
                    Quantity
                  </label>
                  <div
                    {...register("qty", {
                      required: "name is required",
                    })}
                    id="name"
                    className="flex font-semibold items-end "
                  >
                    {orderQuantity}
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
            {errorMessage && (
              <p className="w-full text-[14px] text-[#e60303]">
                {errorMessage}
              </p>
            )}
            <button className="bg-primary-400 active:opacity-70 w-full cursor-pointer h-12 rounded-[8px] my-2 text-white">
              Reserve
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ReservationMain;
