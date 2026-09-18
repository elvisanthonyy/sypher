"use client";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import api from "@/libs/api";
import { IProduct } from "@/models/product";
import CategoryComponent from "./CategoryComponent";
import { getCookies } from "@/app/utils/getCookie";
import FilterComponent from "../filter/FilterComponent";
import { useRouter } from "next/navigation";

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

  //filter by range
  const [mainRange, setMainRange] = useState<MainRange>({
    start: 0,
    end: 10000000000,
  });

  //categories
  const categories = ["hp", "dell", "lenovo", "mac", "others"];

  //product not in category
  let productNotInCategories = [];
  products.forEach((el) => {
    if (categories.some((cat) => el.name.toLowerCase().includes(cat))) {
      return;
    }

    //push to array if not in category
    productNotInCategories.push(el);
  });

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
        {categories.map((category, index) => (
          <CategoryComponent
            key={index}
            mainRange={mainRange}
            category={category}
            products={products}
            categories={categories}
            productNotInCategories={productNotInCategories}
          />
        ))}
      </div>

      {acceptCookiesModal && (
        <div className="fixed flex-col justify-between start gap-4 p-5 left-0 bottom-0 flex w-full h-fit min-h-[226px] md:left-[50%] md:translate-x-[-50%] md:bottom-4 md:rounded-[16px] md:shadow-lg md:items-center md:py-[40px] md:px-[64px] md:w-[434px] bg-white">
          <div className="flex flex-col gap-2">
            <div className="text-text tracking-tight text-[24px] font-bold">
              Cookies notification
            </div>
            <div className="text-text space-x-[18px] text-[14px]">
              We use cookies on our website to help us provide the best internet
              experience, by click accept you accept our terms and conditions
            </div>
          </div>

          <div className="flex w-full gap-4 text-[14px] mb-5  items-center mt-3">
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
