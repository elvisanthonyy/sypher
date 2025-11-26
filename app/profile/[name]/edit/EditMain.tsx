"use client";
import { IUser } from "@/models/user";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/libs/api";
import { toast } from "react-toastify";

interface ChildProps {
  user: IUser;
}

interface FieldValues {
  name?: string;
  address?: string;
  countryCode?: number;
  number?: number;
  gender?: string;
  dateOfBirth?: Date;
}

const EditMain = ({ user }: ChildProps) => {
  const userId = user?._id;
  const { handleSubmit, register, reset } = useForm<FieldValues>({
    defaultValues: {
      name: user?.name,
      address: user?.address,
      countryCode: 234,
      number: user?.number,
      gender: user?.gender,
      dateOfBirth: user?.dateOfBirth,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    api
      .post("/api/profile/user/edit", { ...data, userId })
      .then((res) => {
        if (res.data.status === "okay") {
          toast.success(res.data.message, {
            theme: "dark",
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        console.error("error", error);
        toast.error(error?.response?.message, {
          theme: "dark",
          position: "top-center",
        });
      });
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-5">
        <input
          {...register("name")}
          className="border px-4 my-3 w-full h-12 rounded-sm"
        />
        <input
          {...register("address")}
          className="border px-4 my-3 w-full h-12 rounded-sm"
        />
        <div className="flex items-center">
          <input
            {...register("countryCode")}
            type="number"
            className="w-[20%] border text-center  h-12 mr-2 rounded-sm"
            disabled
          />
          <input
            {...register("number")}
            type="number"
            className="border px-4 my-3 w-full h-12 rounded-sm"
          />
        </div>

        <select
          {...register("gender")}
          className="border px-4 my-3 w-full h-12 rounded-sm"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          {...register("dateOfBirth")}
          type="date"
          className="border px-4 my-3 w-full h-12 rounded-sm"
        />
        <button className="w-full h-13 my-2 bg-black text-white rounded-sm">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditMain;
