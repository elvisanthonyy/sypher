import { IProduct } from "@/models/product";
import Image from "next/image";
import api from "@/libs/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";
import ButtonIcon from "../admin/ButtonIcon";
import DeleteModal from "../Modal";

interface ChildProps {
  product: IProduct;
  stateProducts: IProduct[];
  selectedFilter: string;
  forKey: string;
  setStateProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const AdminProduct = ({
  product,
  setStateProducts,
  stateProducts,
  selectedFilter,
  forKey,
}: ChildProps) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteProduct = () => {
    api
      .post("/api/product/delete", { productId: product._id })
      .then((res) => {
        if (res.data.message === "product deleted") {
          setIsDeleteModalOpen(false);
          const filteredProducts = stateProducts.filter(
            (sProduct) => sProduct._id?.toString() !== product._id.toString(),
          );
          console.log(filteredProducts.length);
          setStateProducts(filteredProducts);
        }
      })
      .catch((err) => {
        console.error("error", err);
      });
  };
  return (
    <div
      key={forKey}
      className={` w-full p-3 ${selectedFilter === "all" || selectedFilter === product.category.toLowerCase() ? "flex" : "hidden"} flex-col gap-3 rounded-[20px] text-black border border-border justify-center bg-white h-fit`}
    >
      <div className="shrink-0 flex flex-col overflow-hidden">
        <DeleteModal
          api={deleteProduct}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
        <section className="flex gap-3 items-center w-full h-full">
          {product?.image?.url && (
            <div className="h-[86px] rounded-[8px] bg-red-400 aspect-square overflow-hidden">
              <Image
                height={300}
                width={500}
                alt="product image"
                src={product?.image?.url}
                className="h-full object-cover"
              />
            </div>
          )}
          <div className="flex text-[14px] text-text flex-col">
            <div className="text-[16px] text-secondary-700 font-semibold">
              {product?.price && `₦${product?.price}.00`}
            </div>
            <div className="font-semibold">{product?.name}</div>

            <div className="">{product?.category}</div>
          </div>
        </section>
      </div>
      <div className="flex flex-col text-[14px] w-full ">
        <div className="h-full flex px-0">
          <div
            onClick={() => router.push(`/product/edit/${product._id}`)}
            className="w-full mr-4 h-10 gap-2 rounded-[32px] flex justify-center items-center bg-text text-white"
          >
            Edit{" "}
            <ButtonIcon size={16} icon="/icons/admin-product-edit-icon.svg" />
          </div>
          <div
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-full h-10 rounded-[32px] flex justify-center items-center bg-primary-400 gap-2  text-white"
          >
            Delete{" "}
            <ButtonIcon size={16} icon="/icons/admin-product-delete-icon.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
