"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/libs/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import Loading from "../loading/Loading";

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
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FormFields) => {
    setLoading(true);
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
      .then((res) => {
        if (res.data.status === "okay") {
          setLoading(false);
          toast.success(res.data.message, {
            theme: "dark",
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("error", error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-5">
        <div className="relative mx-auto flex mb-5 w-full">
          <div className="w-full border md:w-50 h-40 rounded-lg overflow-hidden shrink-0 flex ">
            {preview && (
              <img
                src={preview}
                alt="prev img"
                className="w-full h-40 object-center object-cover"
              />
            )}
          </div>

          <label
            htmlFor="file"
            className="border-2 cursor-pointer text-white flex justify-center items-center border-white bg-black/50  absolute left-[50%] top-[50%] -translate-[50%]  text-center w-12 mx-auto h-12 rounded-full"
          >
            <FaCamera className="text-2lg" />
          </label>
          <input
            {...register("image")}
            onChange={handleChange}
            placeholder="hello"
            type="file"
            id="file"
            className="hidden"
          />
        </div>

        <input
          {...register("name", {
            required: "name is required",
          })}
          type="text"
          placeholder="name"
          className="border border-sypher-light-darkBorder px-4 my-3 w-full h-12 rounded-sm"
        />
        <input
          {...register("type", {
            required: "type is required",
          })}
          placeholder="type"
          type="text"
          className="border border-sypher-light-darkBorder px-4 my-3 w-full h-12 rounded-sm"
        />
        <div className="flex items-center">
          <input
            {...register("category", {
              required: "category is required",
            })}
            placeholder="category"
            type="text"
            className="border border-sypher-light-darkBorder px-4 my-3 w-full h-12 rounded-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            {...register("price", {
              required: "price is required",
            })}
            placeholder="price"
            type="number"
            className="border border-sypher-light-darkBorder px-4 my-3 w-full h-12 rounded-sm"
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

        <button className="w-full flex justify-center items-center border-sypher-light-darkBorder h-13 my-2 bg-black text-white rounded-sm">
          {loading ? <Loading /> : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default ProductUploadMain;
