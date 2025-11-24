"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { IProduct } from "@/models/product";
import api from "@/libs/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface FormFields {
  name: string;
  type: string;
  category: string;
  unitsAvailable: Number;
  price: number;
  image: FileList;
}

const ProductUploadMain = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormFields>();
  const [preview, setPreview] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FormFields) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("category", data.category);
    formData.append("unitsAvailable", data.unitsAvailable.toString());
    formData.append("price", data.price.toString());

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    api
      .post("/api/product/upload", formData)
      .then((res) => {})
      .catch((error) => {
        console.error("error", error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-5">
        <div className="w-70 h-40 overflow-hidden shrink-0 flex mx-auto mb-4 bg-sypher-light-border">
          {preview && <img src={preview} alt="prev img" className="w-full" />}
        </div>
        <input
          {...register("image")}
          onChange={handleChange}
          type="file"
          className="border px-4 my-3 text-center w-full h-12 rounded-sm"
        />

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
            type="number"
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
