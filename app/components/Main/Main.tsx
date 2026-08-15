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
      product?.price <= mainRange.end,
  );
  const dellProducts = products?.filter(
    (product: IProduct) =>
      product.name.toLowerCase().includes("dell") &&
      product?.price >= mainRange.start &&
      product?.price <= mainRange.end,
  );
  const lenovoProducts = products?.filter(
    (product: IProduct) =>
      product.name.toLowerCase().includes("lenovo") &&
      product?.price >= mainRange.start &&
      product?.price <= mainRange.end,
  );
  const macProducts = products?.filter(
    (product: IProduct) =>
      product.name.toLowerCase().includes("mac") &&
      product?.price >= mainRange.start &&
      product?.price <= mainRange.end,
  );

  const otherProductNoFilter = products?.filter(
    (product: IProduct) =>
      !exclude.some((ex) =>
        product.name.toLowerCase().includes(ex.toLowerCase()),
      ),
  );
  const otherProduct = otherProductNoFilter?.filter(
    (product: IProduct) =>
      product?.price >= mainRange.start && product?.price <= mainRange.end,
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
          <div className="flex px-4 shrink-0 pt-4 custom-scrollbar border-b border-border overflow-x-scroll justify-start items-center w-auto min-w-full ">
            {hpProducts &&
              hpProducts.map((product: IProduct) => (
                <div key={product._id.toString()} className={`flex mx-1`}>
                  <ProductComponent mainRange={mainRange} product={product} />
                </div>
              ))}
          </div>
        )}
        {dellProducts?.length > 0 && (
          <div className="flex pt-3 px-4 flex-col w-full">
            <div className="font-semibold px-2 text-[16px] text-text">
              Dell Products
            </div>
            <div className="flex md:border-b border-b border-border min-h-0 shrink-0 custom-scrollbar mt-2 custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
              {dellProducts.map((product: IProduct) => (
                <div key={product._id.toString()} className={`flex mx-1`}>
                  <ProductComponent mainRange={mainRange} product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
        {lenovoProducts.length > 0 && (
          <div className="flex px-4 shrink-0 md:border-b border-b border-border custom-scrollbar my-3  custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
            {lenovoProducts.map((product: IProduct, index) => (
              <div key={product._id.toString()} className={`flex mx-1`}>
                <ProductComponent mainRange={mainRange} product={product} />
              </div>
            ))}
          </div>
        )}
        {macProducts?.length > 0 && (
          <div className="flex px-4 shrink-0  custom-scrollbar my-3 border-b border-border custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
            {macProducts.map((product: IProduct, index) => (
              <div key={product._id.toString()} className={`flex mx-1`}>
                <ProductComponent mainRange={mainRange} product={product} />
              </div>
            ))}
          </div>
        )}
        {otherProduct.length > 0 && (
          <div className="flex shrink-0 custom-scrollbar my-3  custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
            {otherProduct.map((product: IProduct, index) => (
              <div key={product._id.toString()} className={`flex mx-1 `}>
                <ProductComponent mainRange={mainRange} product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {acceptCookiesModal && (
        <div className="fixed flex-col justify-between start gap-4 p-5 left-0 bottom-0 flex w-full h-fit min-h-[226px] bg-white">
          <div className="flex flex-col gap-2">
            <div className="text-text tracking-tight text-[24px] font-bold">
              Cookies notification
            </div>
            <div className="text-text space-x-[18px] text-[14px]">
              We use cookies on our website to help us provide the best internet
              experience, by click accept you accept our terms and conditions
            </div>
          </div>

          <div className="flex w-full gap-4 mb-5  items-center mt-3">
            <button
              onClick={acceptCookies}
              className="bg-primary-400 text-white
               h-[49px] w-[127px] rounded-[8px]"
            >
              Accept
            </button>
            <button
              onClick={() => setAcceptCookiesModal(false)}
              className="bg-text text-white h-[49px] w-[127px] rounded-[8px]"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;
