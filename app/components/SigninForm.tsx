"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Loading from "./loading/Loading";
import { toast } from "react-toastify";

interface FormFields {
  email: string;
  password: string;
}

const SigninForm = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisble] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoading(true);
    console.log(data);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error === "invalid login") {
      setLoading(false);
      setMessage(result.error);
    } else if (result?.error === "user not verified") {
      setLoading(false);

      setMessage(result.error);

      router.push(`/verify/user/${encodeURIComponent(data.email)}`);
    } else {
      setLoading(false);
      toast.success("Log in successfull", {
        theme: "dark",
        position: "top-center",
      });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };
  return (
    <div className="w-full">
      <div></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setMessage("")}
        className="flex w-full px-5 justify-center h-100 flex-col"
      >
        {message && (
          <div className="px-2 w-full text-center text-red-600">{message}</div>
        )}
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
            className="flex bg-sypher-navGray px-12 text-sypher-light-text  focus:outline-none h-13 rounded-2xl w-full"
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
        <button
          disabled={loading ? true : false}
          className="w-full cursor-pointer flex justify-center items-center text-white rounded-2xl my-4 h-13 bg-black"
        >
          {loading ? <Loading /> : "Log in"}
        </button>
        <div
          onClick={() => router.push("/user/forgot-password")}
          className="w-full text-center text-blue-700"
        >
          Forget Password
        </div>
      </form>
      <div onClick={() => router.push("/auth/signup")} className="w-full px-5">
        <div className="w-full text-center mb-3 ">Don't have an account?</div>
        <button className="w-full border mx-auto h-14 rounded-2xl">
          {" "}
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SigninForm;
