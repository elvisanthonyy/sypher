"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "@/libs/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import Loading from "./loading/Loading";

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
              `/verify/user/${encodeURIComponent(res.data.user.email)}`
            );
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
    <>
      <div className="w-30 text-xl h-30 flex justify-center items-center">
        SYPHER
      </div>
      <form
        onChange={() => setMessage("")}
        onSubmit={handleSubmit(onSubmit)}
        className="flex shrink-0 h-100 w-full px-5 justify-center items-center flex-col"
      >
        {message && <div className="text-red-600 mb-1">{message}</div>}
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
        <div className="w-full my-2 items-center height-auto relative flex">
          <div className="absolute h-full flex items-center left-4 top-0 text-sypher-light-darkBorder">
            <FaLock className="" />
          </div>

          <input
            {...register("reapeatPassword", {
              required: "reapeatPassword is required",
            })}
            placeholder=" Repeat password"
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
        <button className="w-full cursor-pointer flex justify-center items-center text-white rounded-2xl my-4 h-13 bg-black">
          {loading ? <Loading /> : "sign up"}
        </button>
      </form>
      <div className="w-full px-5 mt-10">
        <button
          onClick={() => router.push("/auth/signin")}
          className="w-full border mx-auto h-14 rounded-2xl"
        >
          {" "}
          Log In
        </button>
      </div>
    </>
  );
};

export default Form;
