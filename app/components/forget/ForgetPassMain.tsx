"use client";
import api from "@/libs/api";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "../loading/Loading";
import { toast } from "react-toastify";
import Image from "next/image";
import ButtonIcon from "../admin/ButtonIcon";
import multer from "multer";

interface FormFields {
  email: string;
}

const ForgetPassMain = () => {
  const [timer, setTimer] = useState(0);
  const [minutes, setMinutes] = useState(timer / 60);
  const [seconds, setSeconds] = useState(timer % 60);
  const { register, handleSubmit } = useForm<FormFields>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer === 0) return;

    const dropTimer = setInterval(() => {
      setTimer((prev) => prev - 1);
      setMinutes(timer / 60);
      setSeconds(timer % 60);
    }, 1000);

    return () => clearInterval(dropTimer);
  }, [timer]);

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    setLoading(true);
    setTimer(120);
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
    <div className="w-full lg:w-[420px] px-4 flex flex-col justify-center items-center absolute top-[50%] translate-y-[-50%] gap-6">
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
              <ButtonIcon icon="/icons/email-icon.svg" size={20} />
            </div>

            <input
              {...register("email", {
                required: "email is required",
              })}
              placeholder="Enter your Email"
              type="email"
              className="flex border text-[14px] border-border px-10 text-sypher-light-text focus:outline-none h-13 rounded-2xl w-full"
            />
          </div>
          <div className="text-[14px] w-full text-text text-right">
            {timer ? (
              <span>{`${timer > 59 ? `0${Math.floor(minutes)}` : "00"}:${seconds < 10 ? `0${seconds}` : seconds}`}</span>
            ) : (
              <span className="text-[#d8d8d8]">00:00</span>
            )}
          </div>
        </div>

        <button
          disabled={timer > 0 ? true : false}
          className={`w-full text-[14px] ${timer > 0 && "opacity-40"} cursor-pointer flex justify-center items-center text-white rounded-[32px] h-[47px] bg-text`}
        >
          {loading ? <Loading /> : "Send Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassMain;
