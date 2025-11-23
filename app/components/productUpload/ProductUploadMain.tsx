"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { IProduct } from "@/models/product";
import api from "@/libs/api";
import { useRouter } from "next/navigation";

const ProductUploadMain = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IProduct>();
  const onSubmit: SubmitHandler<IProduct> = (data) => {
    api
      .post("/api/product/upload", data)
      .then((res) => {
        if (res.data.status === "okay") {
          router.push(`/product/upload/image/${res.data.product?._id}`);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-5">
        <input
          {...register("name", {
            required: "name is required",
          })}
          type="text"
          placeholder="name"
          className="border px-4 my-3 w-full h-12 rounded-sm"
        />
        <input
          {...register("type", {
            required: "type is required",
          })}
          placeholder="type"
          type="text"
          className="border px-4 my-3 w-full h-12 rounded-sm"
        />
        <div className="flex items-center">
          <input
            {...register("category", {
              required: "category is required",
            })}
            placeholder="category"
            type="text"
            className="border px-4 my-3 w-full h-12 rounded-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            {...register("price", {
              required: "price is required",
            })}
            placeholder="price"
            type="text"
            className="border px-4 my-3 w-full h-12 rounded-sm"
          />
        </div>
        <input
          {...register("unitsAvailable", {
            required: "unitsAvailable is reqired",
          })}
          type="number"
          placeholder="units available"
          className="border px-4 my-3 w-full h-12 rounded-sm"
        />

        <button className="w-full h-13 my-2 bg-black text-white rounded-sm">
          upload
        </button>
      </form>
    </div>
  );
};

export default ProductUploadMain;
