"use client";
import api from "@/libs/api";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import Loading from "../loading/Loading";
import { toast } from "react-toastify";
import Image from "next/image";

interface FormFields {
  email: string;
}

const ForgetPassMain = () => {
  const { register, handleSubmit } = useForm<FormFields>();
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    setLoading(true);
    api
      .post("/api/forgot-password", data)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message, {
          theme: "dark",
          position: "top-center",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <div className="w-full px-4 flex flex-col justify-center items-center absolute top-[50%] translate-y-[-50%] gap-6">
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
        className="flex w-full flex-col px-5 py-11 border bg-white border-border rounded-[32px] gap-6"
      >
        <div className="flex w-full flex-col gap-3">
          <div className="font-semibold px-1 tracking-tight text-[18px] text-text">
            Forgot Password
          </div>
          <div className="w-full items-center height-auto relative flex">
            <div className="absolute h-full flex items-center left-3 top-0 text-sypher-light-darkBorder">
              <FaUser className="text-[14px]" />
            </div>

            <input
              {...register("email", {
                required: "email is required",
              })}
              placeholder="Enter your Email"
              type="email"
              className="flex border text-[14px] border-border px-8 text-sypher-light-text focus:outline-none h-13 rounded-2xl w-full"
            />
          </div>
        </div>
        <button
          disabled={loading ? true : false}
          className="w-full text-[14px] cursor-pointer flex justify-center items-center text-white rounded-[32px] h-[47px] bg-text"
        >
          {loading ? <Loading /> : "Send Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassMain;
