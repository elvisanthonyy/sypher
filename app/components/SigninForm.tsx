"use client";

import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Loading from "./loading/Loading";
import { toast } from "react-toastify";
import api from "@/libs/api";
import { useCart } from "../context/CartContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface FormFields {
  email: string;
  password: string;
}

const SigninForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPasswordVisible, setIsPasswordVisble] = useState(false);
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const redirectUrl = searchParams.get("redirectUrl");
  //disable button when clicked
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoading(true);
    setIsButtonDisabled(true);
    console.log(data);

    //send data
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      adminLogin: false,
      bam: "hi",
    });

    if (!result?.error) {
      //get cart when use is not logged in
      const guestCart = localStorage.getItem("cart");
      //get cookies
      const cookies = document.cookie;
      const match = cookies
        .split("; ")
        .find((row) => row.startsWith("cart_id"))
        ?.split("=")[1];

      if (match || guestCart) {
        //merge cart with users cart
        api
          .post("/api/cart/merge", {
            cartId: match,
            cartItems: JSON.parse(guestCart),
          })
          .then((res) => {
            if (res.data.status === "okay") {
              setLoading(false);
              localStorage.removeItem("cart");
              document.cookie = "cart_id=; path=/; max-age=0";
            }
          })
          .catch((error) => {
            console.error("error", error);
          });
      }
      toast.success("Login successfull", {
        theme: "dark",
        position: "top-center",
      });

      setTimeout(() => {
        if (redirectUrl) {
          router.push(`${redirectUrl}`);
        } else {
          router.push("/");
        }
      }, 1500);
    } else if (result?.error === "user not verified") {
      setLoading(false);
      setIsButtonDisabled(false);
      console.error(result?.error);
      setMessage(result.error);
      setTimeout(() => {
        router.push(`/verify/user/${encodeURIComponent(data.email)}`);
      }, 1000);
    } else {
      console.error("error", result?.error);
      setLoading(false);
      setMessage(result.error);
      setIsButtonDisabled(false);
    }
  };
  return (
    <div className="w-full px-5 absolute top-[50%] translate-y-[-50%]">
      <div className="flex gap-1 items-center w-full mb-7">
        <div className="w-[40px] aspect-square">
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>
        <div className="font-semibold tracking-tight px-2 text-[20px] text-text">
          Max Gadgets
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setMessage("")}
        className="flex w-full gap-6 p-5 py-16 border border-border bg-white rounded-[32px] justify-center h-fit flex-col"
      >
        <div className="font-semibold tracking-tight px-1 text-[18px] text-text">
          Welcome back!
        </div>
        <div className="flex w-full flex-col gap-2">
          {message && (
            <div className="px-2 w-full text-center text-red-600">
              {message}
            </div>
          )}

          <div className="w-full items-center height-auto relative flex">
            <div className="absolute h-full flex items-center left-3 top-0 text-sypher-light-darkBorder">
              <FaUser className="text-[14px]" />
            </div>

            <input
              {...register("email", {
                required: "email is required",
              })}
              placeholder="Enter your email"
              type="email"
              className="flex border-border text-[14px] border px-8 text-text focus:outline-none h-12.5 rounded-2xl w-full"
            />
          </div>
          <div className="w-full items-center height-auto relative flex">
            <div className="absolute h-full flex items-center left-3 top-0 text-sypher-light-darkBorder">
              <FaLock className="text-[14px]" />
            </div>

            <input
              {...register("password", {
                required: "password is required",
              })}
              placeholder="Enter your password"
              type={isPasswordVisible ? "text" : "password"}
              className="flex border-border text-[14px] border px-8 text-text  focus:outline-none h-12.5 rounded-2xl w-full"
            />
            <div
              onClick={() =>
                isPasswordVisible
                  ? setIsPasswordVisble(false)
                  : setIsPasswordVisble(true)
              }
              className="absolute cursor-pointer h-full flex items-center right-4 top-0 text-sypher-light-darkBorder"
            >
              {isPasswordVisible ? (
                <FaEye className="" />
              ) : (
                <FaEyeSlash className="" />
              )}
            </div>
          </div>
          <div
            onClick={() => router.push("/user/forgot-password")}
            className="w-full text-[14px] flex justify-end text-text"
          >
            forgot Password?
          </div>
        </div>
        <button
          disabled={loading ? true : false}
          className="w-full cursor-pointer text-[14px] flex justify-center items-center text-white rounded-[32px] h-13 bg-text"
        >
          {loading ? <Loading /> : "Sign In"}
        </button>

        <div className="flex gap-2 items-center justify-center w-full px-5">
          <div className="text-[14px] ">Don't have an account?</div>
          <button
            onClick={() => router.push("/auth/signup")}
            className="text-[14px] cursor-pointer flex w-fit underline"
            disabled={isButtonDisabled}
          >
            {" "}
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
