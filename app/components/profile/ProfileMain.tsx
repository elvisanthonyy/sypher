"use client";
import { IUser } from "@/models/user";
import ProfileItemComponent from "./ProfileItemComponent";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/libs/api";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";

interface ChildProps {
  user: IUser;
}

interface FormFields {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

const ProfileMain = ({ user }: ChildProps) => {
  const router = useRouter();
  const [changePass, setChangePass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passWordMessage, setPasswordMessage] = useState<string>("");
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    if (data.newPassword === data.repeatPassword) {
      setLoading(true);
      api
        .post("/api/password/change", { ...data, userId: user._id })
        .then((res) => {
          if (res.data.status === "okay") {
            setLoading(false);
            toast.success(res.data.message, {
              theme: "dark",
              position: "top-center",
            });
          } else {
            setLoading(false);
            setPasswordMessage(res.data.message);
          }
        })
        .catch((error) => {
          console.error("error", error);
        });
    } else {
      setPasswordMessage("New Passwords must match");
    }
  };
  return (
    <div className="w-full flex flex-col h-auto min-h-[60dvh] mt-4 px-5">
      {!changePass && (
        <div>
          <ProfileItemComponent
            title="Full Name"
            type="string"
            body={user?.name}
          />
          <ProfileItemComponent
            title="Full Email"
            type="string"
            body={user?.email}
          />
          <ProfileItemComponent
            title="Gender"
            type="string"
            body={user?.gender}
          />
          <ProfileItemComponent
            title="Address"
            type="string"
            body={user?.address}
          />
          <ProfileItemComponent
            title="Number"
            type="number"
            bodyNum={user?.number}
          />
          <ProfileItemComponent
            title="Date of birth"
            type="date"
            bodyDate={user?.dateOfBirth?.toString().split("T")[0]}
          />
          <button
            onClick={() => router.push(`/profile/${user?.name}/edit`)}
            className="h-13 my-3 rounded-2xl cursor-pointer text-white w-full bg-blue-600"
          >
            Edit
          </button>
          <div
            onClick={() => setChangePass(true)}
            className="cursor-pointer h-10 mt-10 flex items-center"
          >
            Change Password <FaArrowRight className="ml-2" />
          </div>
        </div>
      )}

      {changePass && (
        <form
          onChange={() => setPasswordMessage("")}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("oldPassword", {
              required: "Old password is required",
            })}
            type="password"
            placeholder="Old Password"
            className="border border-sypher-light-darkBorder px-4 my-3 w-full h-12 rounded-sm"
          />
          <input
            {...register("newPassword", {
              required: "New password is required",
            })}
            type="password"
            placeholder="New Password"
            className="border border-sypher-light-darkBorder px-4 my-3 w-full h-12 rounded-sm"
          />
          <input
            {...register("repeatPassword", {
              required: "Repeat password is required",
            })}
            type="password"
            placeholder="Repeat Password"
            className="border border-sypher-light-darkBorder px-4 my-3 w-full h-12 rounded-sm"
          />
          {passWordMessage && (
            <div className="w-full text-sm mb-3 text-center text-red-600">
              {passWordMessage}
            </div>
          )}
          <button
            disabled={loading ? true : false}
            className="w-full h-13 flex justify-center items-center text-md bg-blue-500 rounded-lg text-white my2"
          >
            {loading ? <Loading /> : "Change Password"}
          </button>
          <div
            onClick={() => setChangePass(false)}
            className="cursor-pointer h-10 mt-10 flex items-center"
          >
            <FaArrowLeft className="mr-3" /> Back to Profile
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileMain;
