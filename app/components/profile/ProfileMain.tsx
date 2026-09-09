"use client";
import { IUser } from "@/models/user";
import ProfileItemComponent from "./ProfileItemComponent";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaArrowLeft, FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/libs/api";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface ChildProps {
  user: IUser;
}

interface FormFields {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

const ProfileMain = ({ user }: ChildProps) => {
  const searchParams = useSearchParams();
  const changePassword = searchParams.get("change-password");
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
    <div className="w-full px-4">
      {changePassword === "true" ? (
        <form
          className="w-[90%] flex flex-col gap-10 bg-white p-4 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 border border-border rounded-[32px]"
          onChange={() => setPasswordMessage("")}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex flex-col gap-3">
            <input
              {...register("oldPassword", {
                required: "Old password is required",
              })}
              type="password"
              placeholder="Old Password"
              className="border border-border outline-none px-3 w-full h-[50px] rounded-[16px]"
            />
            <input
              {...register("newPassword", {
                required: "New password is required",
              })}
              type="password"
              placeholder="New Password"
              className="border border-border outline-none px-3 w-full h-[50px] rounded-[16px]"
            />
            <input
              {...register("repeatPassword", {
                required: "Repeat password is required",
              })}
              type="password"
              placeholder="Repeat Password"
              className="border border-border outline-none px-3 w-full h-[50px] rounded-[16px]"
            />
            {passWordMessage && (
              <div className="w-full text-sm mb-3 text-center text-red-600">
                {passWordMessage}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <button
              disabled={loading ? true : false}
              className="w-full h-[46px] flex justify-center text-[14px] items-center text-md bg-text rounded-[32px] text-white my2"
            >
              {loading ? <Loading /> : "Change Password"}
            </button>
            <div className="w-full flex gap-2 justify-center items-center">
              <div
                onClick={() => router.push("/user/forgot-password")}
                className="text-text text-[12px] w-full flex justify-end items-center"
              >
                Forgot Password?
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="w-full flex  flex-col justify-center items-center gap-5">
          <div className="w-full t flex flex-col justify-center items-center">
            <div className="w-40 aspect-square flex items-center justify-center bg-text rounded-full">
              <div className="w-25 aspect-square">
                <Image
                  src="/icons/profile-head-icon.svg"
                  alt="Profile"
                  width={160}
                  height={160}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="text-center flex flex-col justify-center items-center gap-2 text-text">
            <div className="text-[20px] font-semibold flex gap-2">
              {user?.name}{" "}
              <div className="w-6 aspect-square">
                <Image
                  src="/icons/verified-icon.svg"
                  alt="Edit"
                  width={60}
                  height={60}
                  className="w-full h-full"
                />{" "}
              </div>
            </div>
            <div className="text-[16px] text-[#b4b4b4]">{user?.email}</div>
          </div>
          <div className="gap-4 w-full rounded-[24px] p-2 flex flex-col h-auto bg-text">
            <ProfileItemComponent
              iconUrl="/icons/gender-icon.svg"
              title="Gender"
              type="string"
              body={user?.gender}
            />
            <ProfileItemComponent
              iconUrl="/icons/date-of-birth-icon.svg"
              title="Date of birth"
              type="date"
              bodyDate={user?.dateOfBirth?.toString().split("T")[0]}
            />
            <ProfileItemComponent
              iconUrl="/icons/location-icon.svg"
              title="Address"
              type="string"
              body={user?.address}
            />
            <ProfileItemComponent
              iconUrl="/icons/phone-icon.svg"
              title="Number"
              type="string"
              bodyNum={`+234 ${user?.number}`}
            />
          </div>
          <button
            onClick={() => router.push(`/profile/${user?.name}/edit`)}
            className="h-13 flex text-[14px] gap-2 items-center justify-center mt-8 rounded-[32px] cursor-pointer text-white w-full bg-primary-400"
          >
            Edit{" "}
            <div className="w-4 aspect-square">
              <Image
                src="/icons/edit-icon.svg"
                alt="Edit"
                width={20}
                height={20}
                className="w-full h-full"
              />
            </div>
          </button>
          <div
            onClick={() =>
              router.push(`/profile/${user?.name}?change-password=true`)
            }
            className="cursor-pointer text-[14px] gap-2 text-text w-full justify-end flex items-center"
          >
            Change Password{" "}
            <FaArrowRight className="text-[14px] text-primary-400" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMain;
