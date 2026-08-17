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
    <div className="w-full px-4">
      {!changePass && (
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
          <div className="text-center flex flex-col gap-2 text-text">
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
            <div className="text-[16px] text-border">{user?.email}</div>
          </div>
          <div className="gap-4 w-full rounded-[24px] p-2 flex flex-col h-auto bg-white">
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
            onClick={() => setChangePass(true)}
            className="cursor-pointer text-[14px] gap-2 text-text w-full justify-end flex items-center"
          >
            Change Password{" "}
            <FaArrowRight className="text-[14px] text-primary-400" />
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
          <div className="w-full flex gap-2 justify-center items-center">
            <div
              onClick={() => router.push("/user/forgot-password")}
              className="text-white rounded-lg mt-10 text-sm bg-black w-full h-13 flex justify-center items-center"
            >
              Forgot Password
            </div>
          </div>
          <div
            onClick={() => setChangePass(false)}
            className="cursor-pointer text-[14px] text-text w-full justify-end flex items-center"
          >
            <FaArrowLeft className="mr-3" /> Back to Profile
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileMain;
