"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import api from "@/libs/api";
import { useState, useEffect } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

interface FieldValues {
  otp: string;
}

interface ChildProps {
  email: string;
}

const VerifyMain = ({ email }: ChildProps) => {
  const { register, handleSubmit } = useForm<FieldValues>();
  const [resendCount, setResendCount] = useState(0);
  const countDown = () => {};
  const resendOtp = () => {
    setResendCount(60);
    api
      .post("/api/verify/resend", { email })
      .then((res) => {
        if (res.data.status === "okay") {
          toast.success(res.data.message, {
            theme: "dark",
            position: "top-center",
          });
        }

        countDown();
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    api
      .post("/api/verify/user", { email, otp: data.otp })
      .then((res) => {
        toast.success(res.data.message, {
          theme: "dark",
          position: "top-center",
        });
        setTimeout(() => {
          redirect("/auth/signin");
        }, 2000);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  useEffect(() => {
    if (resendCount === 0) return;
    const timer = setInterval(() => {
      setResendCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCount]);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex px-5 flex-col w-full items-center"
      >
        <div className="w-full my-4 items-center height-auto relative flex">
          <input
            {...register("otp", {
              required: "otp is required",
            })}
            placeholder="------"
            type="password"
            maxLength={6}
            className="flex justify-center items-center text-4xl border border-gray-600 text-center text-black focus:outline-none h-13 rounded-2xl w-full"
          />
        </div>
        <button
          onClick={resendOtp}
          type="button"
          className={`${
            resendCount > 0 ? "text-gray-700" : "text-blue-700 cursor-pointer"
          } text-black`}
          disabled={resendCount > 0 ? true : false}
        >
          {resendCount > 0 ? `${resendCount} to ` : ""} Resend Otp
        </button>
        <button className="w-full mt-20 flex justify-center items-center cursor-pointer text-white rounded-2xl my-4 h-13 bg-black">
          <RiVerifiedBadgeFill className="mr-3" />
          Verify
        </button>
      </form>
    </>
  );
};

export default VerifyMain;
