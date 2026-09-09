"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/libs/api";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Loading from "../loading/Loading";
import Image from "next/image";

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
  const [pageNumber, setPageNumber] = useState(1);
  //disable upload button when clicked
  const [isUploading, setIsUploading] = useState(false);
  const pages = [1, 2];
  const { register, handleSubmit, reset, watch } = useForm<FormFields>();

  const name = watch("name");
  const type = watch("type");
  const category = watch("category");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    if (files) {
      setPreview(URL.createObjectURL(files));
      setFile(files);
    }
  };

  const onSubmit = async (data: FormFields) => {
    setLoading(true);
    setIsUploading(true); // Set isUploading to true when the upload starts
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("category", data.category);
    formData.append("unitsAvailable", data.unitsAvailable.toString());
    formData.append("price", data.price.toString());

    if (file) {
      formData.append("image", file);
    }
    api
      .post("/api/product/upload", formData)
      .then((res) => {
        setIsUploading(false); // Set isUploading to false when the upload is complete
        if (res.data.status === "okay") {
          reset();
          setLoading(false);
          toast.success(res.data.message, {
            theme: "dark",
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        setIsUploading(false); // Set isUploading to false if there's an error
        setLoading(false);
        console.error("error", error);
      });
  };

  const nextPage = (data: FormFields) => {
    if (!data.name || !data.type || !data.category) {
      return;
    }
    setPageNumber(2);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-5 flex flex-col gap-6"
      >
        {/* image upload section */}
        <div className="relative mx-auto flex w-full">
          <div className="w-full aspect-[8/6] border-dashed border border-[#B2B2B2] md:w-50 md:h-40 rounded-lg overflow-hidden shrink-0 flex ">
            {preview && (
              <img
                src={preview}
                alt="prev img"
                className="w-full h-full object-center object-cover"
              />
            )}
          </div>

          <label
            htmlFor="file"
            className="absolute gap-4 top-0 left-0 cursor-pointer text-text flex flex-col justify-center items-center  text-center w-12 mx-auto h-12 w-full h-full"
          >
            <input
              {...register("image")}
              onChange={handleChange}
              placeholder="hello"
              type="file"
              id="file"
              className="hidden"
            />
            <div className="flex justify-center items-center gap-3">
              <div className="h-[100px] aspect-square">
                <Image
                  src="/icons/image-upload-icon.svg"
                  alt="upload icon"
                  width={24}
                  height={24}
                  draggable={false}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div className="h-[24px] aspect-square">
                <Image
                  src="/icons/upload-icon.svg"
                  alt="upload icon"
                  width={24}
                  height={24}
                  draggable={false}
                  className="w-full h-full"
                />
              </div>
              Click to upload image
            </div>
          </label>
        </div>

        {/* indicator */}
        <section className="flex gap-1">
          {pages.map((page, index) => (
            <div
              key={index}
              className={`h-1 w-full rounded-full ${pageNumber >= index + 1 ? "bg-primary-400" : "bg-[#f2f2f2]"}`}
            />
          ))}
        </section>

        {/* first product details section */}
        {pageNumber === 1 && (
          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-text text-[16px] flex flex-col"
              >
                Product Name
              </label>
              <input
                {...register("name", {
                  required: "name is required",
                })}
                type="text"
                placeholder="Enter product name"
                className="border outline-none text-[14px] border-border px-3 w-full h-[50px] rounded-[16px]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="type"
                className="text-text text-[16px] flex flex-col"
              >
                Product Type
              </label>
            </div>
            <input
              {...register("type", {
                required: "type is required",
              })}
              placeholder="Enter product type"
              type="text"
              className="border outline-none text-[14px] border-border px-3 w-full h-[50px] rounded-[16px]"
            />
            <div className="flex flex-col gap-1">
              <label
                htmlFor="category"
                className="text-text text-[16px] flex flex-col"
              >
                Category
              </label>
              <input
                {...register("category", {
                  required: "category is required",
                })}
                placeholder="Enter category"
                type="text"
                className="border outline-none text-[14px] border-border px-3 w-full h-[50px] rounded-[16px]"
              />
            </div>
            <button
              onClick={() => nextPage({ name, type, category } as FormFields)}
              className="w-full text-[14px] flex justify-center gap-2 mt-3 items-center bg-text h-[46px] bg-black text-white rounded-[32px]"
            >
              Next
              <div className="w-[20px] rotate-180 aspect-square">
                <Image
                  src="/icons/upload-back-icon.svg"
                  alt="back icon"
                  height={50}
                  width={50}
                  draggable={false}
                  className="w-full h-full"
                />
              </div>
            </button>
          </section>
        )}

        {/* Second product details section */}

        {pageNumber === 2 && (
          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="price"
                className="text-text text-[16px] flex flex-col"
              >
                Price
              </label>
              <input
                {...register("price", {
                  required: "price is required",
                })}
                placeholder="Enter price"
                type="number"
                className="border outline-none text-[14px] border-border px-3 w-full h-[50px] rounded-[16px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="unitsAvailable"
                className="text-text text-[16px] flex flex-col"
              >
                Units Available
              </label>
              <input
                {...register("unitsAvailable", {
                  required: "unitsAvailable is required",
                })}
                type="number"
                placeholder="Enter units available"
                className="border outline-none text-[14px] border-border px-3 w-full h-[50px] rounded-[16px]"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPageNumber(1)}
                className="flex justify-center w-[60px] mt-3 items-center bg-text h-[46px] bg-black text-white rounded-[32px]"
              >
                <div className="w-[20px] aspect-square">
                  <Image
                    src="/icons/upload-back-icon.svg"
                    alt="back icon"
                    height={50}
                    width={50}
                    draggable={false}
                    className="w-full h-full"
                  />
                </div>
              </button>
              <button
                className={`w-full flex justify-center mt-3 items-center bg-primary-400 text-[14px] h-[46px] bg-black ${isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-90"} text-white rounded-[32px]`}
                disabled={isUploading} // Disable the button when uploading
              >
                {loading ? (
                  <Loading />
                ) : (
                  <div className="flex justify-center gap-2 items-center">
                    Upload{" "}
                    <div className="w-[16px] aspect-square">
                      <Image
                        src="/icons/button-upload-icon.svg"
                        alt="back icon"
                        height={50}
                        width={50}
                        draggable={false}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default ProductUploadMain;
