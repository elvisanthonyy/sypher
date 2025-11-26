"use client";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import api from "@/libs/api";
import { IProduct } from "@/models/product";
import ProductComponent from "./ProductComponent";
import { getCookies } from "@/app/utils/getCookie";
import FilterComponent from "../filter/FilterComponent";

interface ChildProps {
  session: Session | null;
  products: IProduct[];
}

export interface MainRange {
  start: number;
  end: number;
}

const Main = ({ session, products }: ChildProps) => {
  const [acceptCookiesModal, setAcceptCookiesModal] = useState(false);
  const exclude = ["hp", "mac", "dell", "lenovo"];
  const [mainRange, setMainRange] = useState<MainRange>({
    start: 0,
    end: 10000000000,
  });

  const acceptCookies = () => {
    api
      .get("/api/cookies/accept")
      .then((res) => {
        if (res.data.ok === true) {
          setAcceptCookiesModal(false);
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
    }

    if (session) {
      document.cookie = "cart_id=; path=/; max-age=0";
    }
  }, []);
  return (
    <main className="h-dvh pt-34 w-full top-0 left-0 relative">
      <FilterComponent mainRange={mainRange} setMainRange={setMainRange} />
      <div className="flex custom-scrollbar my-3 border-sypher-light-border border-t overflow-x-scroll justify-start items-center w-auto min-w-full ">
        {products &&
          products
            ?.filter((product: IProduct) =>
              product?.name.toLowerCase().includes("hp")
            )
            .map((product: IProduct) => (
              <div
                key={product._id}
                className={`flex mx-1 ${
                  Number(product.price) >= mainRange.start &&
                  Number(product.price) <= mainRange.end
                    ? "flex"
                    : "hidden"
                }`}
              >
                <ProductComponent mainRange={mainRange} product={product} />
              </div>
            ))}
      </div>
      <div className="flex custom-scrollbar my-3 custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
        {products &&
          products
            ?.filter((product: IProduct) =>
              product.name.toLowerCase().includes("dell")
            )
            .map((product: IProduct) => (
              <div
                key={product._id}
                className={`flex mx-1 ${
                  Number(product.price) >= mainRange.start &&
                  Number(product.price) <= mainRange.end
                    ? "flex"
                    : "hidden"
                }`}
              >
                <ProductComponent mainRange={mainRange} product={product} />
              </div>
            ))}
      </div>
      <div className="flex custom-scrollbar my-3  custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
        {products
          ?.filter((product: IProduct) =>
            product.name.toLowerCase().includes("lenovo")
          )
          .map((product: IProduct, index) => (
            <div
              key={product._id}
              className={`flex mx-1 ${
                Number(product.price) >= mainRange.start &&
                Number(product.price) <= mainRange.end
                  ? "flex"
                  : "hidden"
              }`}
            >
              <ProductComponent mainRange={mainRange} product={product} />
            </div>
          ))}
      </div>
      <div className="flex custom-scrollbar my-3  custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
        {products
          ?.filter((product: IProduct) =>
            product.name.toLowerCase().includes("mac")
          )
          .map((product: IProduct, index) => (
            <div
              key={product._id}
              className={`flex mx-1 ${
                Number(product.price) >= mainRange.start &&
                Number(product.price) <= mainRange.end
                  ? "flex"
                  : "hidden"
              }`}
            >
              <ProductComponent mainRange={mainRange} product={product} />
            </div>
          ))}
      </div>
      <div className="flex custom-scrollbar my-3  custom-scrollbar overflow-x-scroll justify-start items-center w-auto min-w-full ">
        {products
          ?.filter(
            (product: IProduct) =>
              !exclude.some((ex) =>
                product.name.toLowerCase().includes(ex.toLowerCase())
              )
          )
          .map((product: IProduct, index) => (
            <div
              key={product._id}
              className={`flex mx-1 ${
                Number(product.price) >= mainRange.start &&
                Number(product.price) <= mainRange.end
                  ? "flex"
                  : "hidden"
              }`}
            >
              <ProductComponent mainRange={mainRange} product={product} />
            </div>
          ))}
      </div>
      {acceptCookiesModal && (
        <div className="fixed flex-col justify-center items-center left-[50%] -translate-x-[50%] bottom-4 flex w-[90%] h-30 rounded-2xl bg-black">
          <div className="text-white">Do you want to accept cookies?</div>
          <div className="flex items-center mt-3">
            <button
              onClick={acceptCookies}
              className="bg-white text-black h-7 w-15 mx-5"
            >
              Yes
            </button>
            <button
              onClick={() => setAcceptCookiesModal(false)}
              className="bg-white text-black h-7 w-15 mx-5"
            >
              No
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;
