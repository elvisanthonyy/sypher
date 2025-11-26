import { IProduct } from "@/models/product";
import Image from "next/image";

interface ChildProps {
  product: IProduct;
}

const AdminProduct = ({ product }: ChildProps) => {
  return (
    <div className="flex w-full my-5 relative text-black border-b border-t border-sypher-light-border justify-start py-4  items-center flex-col h-120">
      <div className="shrink-0 overflow-hidden border-b border-b-sypher-light-border w-full h-50 bg-gray-300">
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
        <div className="h-full flex justify-between w-full mt-18 px-2">
          <div className="w-25 h-12 rounded-lg flex justify-center items-center bg-black text-white">
            Edit
          </div>
          <div className="w-25 h-12 rounded-lg flex justify-center items-center bg-blue-700 text-white">
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
