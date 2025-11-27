"use client";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import api from "@/libs/api";
import { IProduct } from "@/models/product";
import ProductComponent from "./ProductComponent";
import { getCookies } from "@/app/utils/getCookie";
import FilterComponent from "../filter/FilterComponent";
import { useRouter } from "next/navigation";
import HomeLoading from "../loading/HomeLoading";

interface ChildProps {
  session: Session | null;
  products: IProduct[];
}

export interface MainRange {
  start: number;
  end: number;
}

const Main = ({ session, products }: ChildProps) => {
  const router = useRouter();
  const [acceptCookiesModal, setAcceptCookiesModal] = useState(false);
  const exclude = ["hp", "mac", "dell", "lenovo"];

  const [mainRange, setMainRange] = useState<MainRange>({
    start: 0,
    end: 10000000000,
  });
  //put products in brand and Price
  const hpProducts = products?.filter(
    (product: IProduct) =>
      product?.name.toLowerCase().includes("hp") &&
      product?.price >= mainRange.start &&
      product?.price <= mainRange.end
  );
  const dellProducts = products?.filter(
    (product: IProduct) =>
      product.name.toLowerCase().includes("dell") &&
      product?.price >= mainRange.start &&
      product?.price <= mainRange.end
  );
  const lenovoProducts = products?.filter(
    (product: IProduct) =>
      product.name.toLowerCase().includes("lenovo") &&
      product?.price >= mainRange.start &&
      product?.price <= mainRange.end
  );
  const macProducts = products?.filter(
    (product: IProduct) =>
      product.name.toLowerCase().includes("mac") &&
      product?.price >= mainRange.start &&
      product?.price <= mainRange.end
  );

  const otherProductNoFilter = products?.filter(
    (product: IProduct) =>
      !exclude.some((ex) =>
        product.name.toLowerCase().includes(ex.toLowerCase())
      )
  );
  const otherProduct = otherProductNoFilter?.filter(
    (product: IProduct) =>
      product?.price >= mainRange.start && product?.price <= mainRange.end
  );

  const acceptCookies = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    api
      .post("/api/cookies/accept", { cartItems: cart })
      .then((res) => {
        if (res.data.ok === true) {
          setAcceptCookiesModal(false);
          router.refresh();
          localStorage.removeItem("cart");
        }
      })
      .catch((error) => console.error("Error", error));
  };
  useEffect(() => {
    const cookieCheck = getCookies();

    if (!cookieCheck && !session) {
      setAcceptCookiesModal(true);
    } else {
      setAcceptCookiesModal(false);
      if (session) {
        document.cookie = "cart_id=; path=/; max-age=0";
      }
    }
  }, []);
  return (
    <main className="h-dvh pt-30 flex flex-col w-full top-0 left-0 relative">
      <FilterComponent mainRange={mainRange} setMainRange={setMainRange} />

      <div className="">
        {hpProducts?.length > 0 && (
          <div className="flex md:border-b shrink-0 custom-scrollbar mt-2 border-sypher-light-border overflow-x-scroll justify-start items-center w-auto min-w-full ">
            {hpProducts &&
              hpProducts.map((product: IProduct) => (
                <div key={product._id} className={`flex mx-1`}>
                  <ProductComponent mainRange={mainRange} product={product} />
                </div>
              ))}
          </div>
        )}
        {dellProducts?.length > 0 && (
          <div className="flex md:border-b min-h-0 shrink-0 custom-scrollbar mt-2 custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
            <div className="px-5 mt-5">Dells</div>

            {products.map((product: IProduct) => (
              <div key={product._id} className={`flex mx-1`}>
                <ProductComponent mainRange={mainRange} product={product} />
              </div>
            ))}
          </div>
        )}
        {lenovoProducts.length > 0 && (
          <div className="flex shrink-0 md:border-b custom-scrollbar my-3  custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
            {lenovoProducts.map((product: IProduct, index) => (
              <div key={product._id} className={`flex mx-1`}>
                <ProductComponent mainRange={mainRange} product={product} />
              </div>
            ))}
          </div>
        )}
        {macProducts?.length > 0 && (
          <div className="flex shrink-0 custom-scrollbar my-3  custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
            {macProducts.map((product: IProduct, index) => (
              <div key={product._id} className={`flex mx-1`}>
                <ProductComponent mainRange={mainRange} product={product} />
              </div>
            ))}
          </div>
        )}
        {otherProduct.length > 0 && (
          <div className="flex shrink-0 custom-scrollbar my-3  custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
            {otherProduct.map((product: IProduct, index) => (
              <div key={product._id} className={`flex mx-1 `}>
                <ProductComponent mainRange={mainRange} product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {acceptCookiesModal && (
        <div className="fixed flex-col justify-center items-center left-0 bottom-0 flex w-full h-55 rounded-tl-2xl rounded-tr-2xl bg-black">
          <div className="text-white">Do you want to accept cookies?</div>
          <div className="flex w-full px-5 flex-col items-center mt-3">
            <button
              onClick={acceptCookies}
              className="bg-white text-black h-10 w-[80%] mx-5 my-2"
            >
              Accept all
            </button>
            <button
              onClick={() => setAcceptCookiesModal(false)}
              className="bg-white text-black h-10 w-[80%] mx-5 my-2"
            >
              Reject all
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;
