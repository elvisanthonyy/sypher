import { IProduct } from "@/models/product";
import Image from "next/image";
import api from "@/libs/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ChildProps {
  product: IProduct;
}

const AdminProduct = ({ product }: ChildProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const deleteProduct = () => {
    api
      .post("/api/product/delete", { productId: product._id })
      .then(() => {})
      .catch((err) => {
        console.error("error", err);
      });
  };
  return (
    <div className="flex w-full my-1  mb-10 relative text-black border-b border-t border-sypher-light-border justify-start pb-4 bg-white items-center flex-col h-126">
      <div className="shrink-0 overflow-hidden border-b  border-b-sypher-light-border w-full h-50 ">
        <div
          onClick={() => setIsDeleteModalOpen(false)}
          className={`h-dvh top-0 flex transition-all duration-500 ease-in-out left-0 ${
            isDeleteModalOpen
              ? "translate-0 opacity-100"
              : "-translate-300 opacity-0"
          } justify-center z-50 isolation-isolate items-center backdrop-blur-xl fixed w-full bg-black/5`}
        >
          {" "}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-64 flex justify-center items-center rounded-2xl h-45 z-50 bg-white shadow-lg"
          >
            <div className="w-20 text-center" onClick={deleteProduct}>
              Yes
            </div>
            <div
              className="w-20 text-center"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              No
            </div>
          </div>
        </div>
        {product?.image?.url && (
          <Image
            height={300}
            width={500}
            alt="product image"
            src={product?.image?.url}
            className="w-[105%] h-full object-cover"
          />
        )}
      </div>
      <div className="flex text-sm my-5 flex-col h-[50%] px-1 w-[95%] ">
        <div>{product?.name}</div>
        <div className="text-lg font-semibold">
          {product?.price && `₦${product?.price}.00`}
        </div>
        <div className="italic">{product?.category}</div>
        <div className="w-full border-b border-b-sypher-light-border py-2">
          Specs
        </div>
        <div>
          Core i5
          <br />
          6th Gen
          <br />
          500GB SSD
          <br />
          Keyboard light
          <br />
          Windows 10 pro
        </div>
        <div className="h-full py-2 border-t mt-3 border-sypher-light-border flex w-full px-0">
          <div
            onClick={() => router.push(`/product/edit/${product._id}`)}
            className="w-12 mr-4 h-12 rounded-lg flex justify-center items-center bg-black text-white"
          >
            <FaEdit className="ml-1 text-lg" />
          </div>
          <div
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-12 h-12 rounded-lg flex justify-center items-center bg-blue-400 text-white"
          >
            <FaTrash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
