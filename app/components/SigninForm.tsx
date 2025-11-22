"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

interface FormFields {
  email: string;
  password: string;
}

const SigninForm = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisble] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error === "invalid login") {
      alert(result.error);
      console.error(result.error);
    } else if (result?.error === "user not verified") {
      router.push(`/verify/user/${encodeURIComponent(data.email)}`);
    } else {
      router.push("/");
    }
  };
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full px-5 justify-center h-100 flex-col"
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
        <button className="w-full cursor-pointer text-white rounded-2xl my-4 h-13 bg-black">
          Log in
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
