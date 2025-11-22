"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "@/libs/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

interface FormFields {
  name: string;
  email: string;
  password: string;
}

const Form = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const [isPasswordVisible, setIsPasswordVisble] = useState(false);
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    api
      .post("/api/signup", data)
      .then((res) => {
        if (res.data.status === "okay") {
          router.push(
            `/verify/user/${encodeURIComponent(res.data.user.email)}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex shrink-0 h-100 w-full px-5 justify-center items-center flex-col"
      >
        <div className="w-full my-2 items-center height-auto relative flex">
          <div className="absolute h-full flex items-center left-4 top-0 text-sypher-light-darkBorder">
            <FaUser className="" />
          </div>

          <input
            {...register("name", {
              required: "name is required",
            })}
            placeholder="Full name"
            type="text"
            className="flex bg-sypher-navGray px-12 text-sypher-light-text focus:outline-none h-13 rounded-2xl w-full"
          />
        </div>

        <div className="w-full my-2 items-center height-auto relative flex">
          <div className="absolute h-full flex items-center left-4 top-0 text-sypher-light-darkBorder">
            <FaEnvelope className="" />
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
        <div className="w-full my-2 items-center height-auto relative flex">
          <div className="absolute h-full flex items-center left-4 top-0 text-sypher-light-darkBorder">
            <FaLock className="" />
          </div>

          <input
            {...register("password", {
              required: "password is required",
            })}
            placeholder="password"
            type={isPasswordVisible ? "text" : "password"}
            className="flex bg-sypher-navGray px-12 text-sypher-light-text focus:outline-none h-13 rounded-2xl w-full"
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
        <button className="w-full cursor-pointer text-white rounded-2xl my-4 h-13 bg-black">
          Sigin up
        </button>
      </form>
    </>
  );
};

export default Form;
