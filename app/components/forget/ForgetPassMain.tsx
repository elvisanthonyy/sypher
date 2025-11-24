"use client";
import api from "@/libs/api";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import Loading from "../loading/Loading";
import { toast } from "react-toastify";

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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col px-5"
      >
        <div className="w-full my-2 items-center height-auto relative flex">
          <div className="absolute h-full flex items-center left-4 top-0 text-sypher-light-darkBorder">
            <FaUser className="" />
          </div>

          <input
            {...register("email", {
              required: "email is required",
            })}
            placeholder="Email"
            type="email"
            className="flex bg-sypher-navGray px-12 text-sypher-light-text focus:outline-none h-13 rounded-2xl w-full"
          />
        </div>
        <button
          disabled={loading ? true : false}
          className="w-full cursor-pointer flex justify-center items-center text-white rounded-2xl my-4 h-13 bg-black"
        >
          {loading ? <Loading /> : "Send Link"}
        </button>
      </form>
    </>
  );
};

export default ForgetPassMain;
