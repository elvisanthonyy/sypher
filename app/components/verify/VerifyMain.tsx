"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import api from "@/libs/api";
import { useState, useEffect } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import Loading from "../loading/Loading";
import { error } from "console";

interface FieldValues {
  otp: string;
}

interface ChildProps {
  email: string;
}

const VerifyMain = ({ email }: ChildProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const [resendCount, setResendCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    if (data.otp.length === 6) {
      api
        .post("/api/verify/user", { email, otp: data.otp })
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message, {
            theme: "dark",
            position: "top-center",
          });
          setTimeout(() => {
            redirect("/auth/signin");
          }, 2000);
        })
        .catch((error) => {
          setLoading(false);
          console.error("error", error);
        });
    }
  };
  useEffect(() => {
    if (resendCount === 0) return;
    const timer = setInterval(() => {
      setResendCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCount]);
  return (
    <div className="absolute top-[50%] translate-y-[-50%] px-4">
      <div className="text-[20px] mb-10 px-2 tracking-tight w-full flex text-left text-text font-semibold">
        {" "}
        Verify your Email
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex px-5 py-10 flex-col border  border-border bg-white rounded-[32px]  w-full items-center"
      >
        <div className="flex flex-col w-full gap-2">
          <div className="w-full flex-col pb-1 items-center height-auto relative flex">
            {errors.otp && (
              <div className="text-red-400 w-full text-left md:w-[50%] md:mx-auto mb-1 text-[12px] px-2">
                {errors.otp?.message}
              </div>
            )}
            <input
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 6,
                  message: "OTP must be a 6 digit code",
                },
              })}
              placeholder="------"
              type="password"
              maxLength={6}
              className="flex justify-center items-center text-4xl border border-border text-center text-text focus:outline-none h-13 rounded-[16px] w-full"
            />
          </div>
          <button
            onClick={resendOtp}
            type="button"
            className={`text-right px-1 w-full text-[14px] ${
              resendCount > 0 ? "text-gray-700" : "text-blue-400 cursor-pointer"
            }`}
            disabled={resendCount > 0 ? true : false}
          >
            {resendCount > 0 ? `${resendCount} to ` : ""} Resend Otp
          </button>
          <button className="w-full mt-4 flex justify-center items-center cursor-pointer text-white rounded-[32px] mb-4 h-11 bg-text">
            <div className="flex items-center gap-2">
              Verify
              <RiVerifiedBadgeFill className="text-[20px]" />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyMain;
