"use client";
import api from "@/libs/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Loading from "../loading/Loading";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FormFields {
  password: string;
}

interface ChildProps {
  token: string | string[] | undefined;
}

const ResetPassMain = ({ token }: ChildProps) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormFields>();
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    setLoading(true);
    api
      .post("/api/reset-password", { ...data, token })
      .then((res) => {
        setLoading(false);
        toast(res.data.message, {
          theme: "dark",
          position: "top-center",
        });
        setTimeout(() => {
          router.push("/auth/sigin");
        }, 1000);
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
        className="flex flex-col w-full px-5"
      >
        <div className="w-full my-2 items-center height-auto relative flex">
          <div className="absolute h-full flex items-center left-4 top-0 text-sypher-light-darkBorder">
            <FaLock className="" />
          </div>

          <input
            {...register("password", {
              required: "password is required",
            })}
            placeholder="New password"
            type="password"
            className="flex bg-sypher-navGray px-12 text-sypher-light-text focus:outline-none h-13 rounded-2xl w-full"
          />
        </div>
        <button
          disabled={loading ? true : false}
          className="w-full cursor-pointer flex justify-center items-center text-white rounded-2xl my-4 h-13 bg-black"
        >
          {loading ? <Loading /> : "Reset"}
        </button>
      </form>
    </>
  );
};

export default ResetPassMain;
