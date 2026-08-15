"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "@/libs/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import Loading from "./loading/Loading";
import { toast } from "react-toastify";
import Image from "next/image";

interface FormFields {
  name: string;
  email: string;
  password: string;
  reapeatPassword: string;
}

const Form = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const [isPasswordVisible, setIsPasswordVisble] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (data.password == data.reapeatPassword) {
      setLoading(true);
      api
        .post("/api/signup", data)
        .then((res) => {
          setLoading(false);
          if (res.data.status === "okay") {
            router.push(
              `/verify/user/${encodeURIComponent(res.data.user.email)}`,
            );
          } else {
            toast.error(res.data.message, {
              theme: "dark",
              position: "top-center",
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } else {
      setMessage("Passwords do not match");
    }
  };
  return (
    <div className="px-4 w-full absolute top-[50%] translate-y-[-50%]">
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
        <div className="font-semibold tracking-tight px-1 text-[20px] text-text">
          Max Gadgets
        </div>
      </div>
      <form
        onChange={() => setMessage("")}
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full gap-6 p-5 py-14 border border-border bg-white rounded-[32px] justify-center h-fit flex-col"
      >
        <div className="font-semibold  tracking-tight px-2 text-[18px] text-text">
          Create your account for free
        </div>
        <div className="gap-3 flex flex-col">
          {message && <div className="text-red-600 mb-1">{message}</div>}
          <div className="w-full items-center height-auto relative flex">
            <div className="absolute h-full flex items-center left-3 top-0 text-sypher-light-darkBorder">
              <FaUser className="text-[14px]" />
            </div>

            <input
              {...register("name", {
                required: "name is required",
              })}
              placeholder="Full name"
              type="text"
              className="flex border border-border text-[14px] text-text px-8 focus:outline-none h-13 rounded-2xl w-full"
            />
          </div>

          <div className="w-full items-center height-auto relative flex">
            <div className="absolute h-full flex items-center left-3 top-0 text-sypher-light-darkBorder">
              <FaEnvelope className="text-[14px]" />
            </div>

            <input
              {...register("email", {
                required: "email is required",
              })}
              placeholder="Email"
              type="email"
              className="flex border border-border text-[14px] text-text px-8 focus:outline-none h-13 rounded-2xl w-full"
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
              placeholder="Enter your Password"
              type={isPasswordVisible ? "text" : "password"}
              className="flex border border-border text-[14px] text-text px-8 focus:outline-none h-13 rounded-2xl w-full"
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
          <div className="w-full items-center height-auto relative flex">
            <div className="absolute h-full flex items-center left-3 top-0 text-sypher-light-darkBorder">
              <FaLock className="text-[14px]" />
            </div>

            <input
              {...register("reapeatPassword", {
                required: "reapeatPassword is required",
              })}
              placeholder=" Repeat password"
              type={isPasswordVisible ? "text" : "password"}
              className="flex border border-border text-[14px] text-text px-8 focus:outline-none h-13 rounded-2xl w-full"
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
        </div>
        <button className="w-full cursor-pointer flex justify-center items-center text-white rounded-[32px] my-4 h-13 bg-text">
          {loading ? <Loading /> : "sign up"}
        </button>
        <div className="w-full flex justify-center items-center gap-2 items-center px-5">
          <div>Have an account?</div>
          <button
            onClick={() => router.push("/auth/signin")}
            className="underline w-fit text-[14px]"
          >
            {" "}
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
