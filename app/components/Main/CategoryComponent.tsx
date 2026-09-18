"use client";
import ProductComponent from "./ProductComponent";
import { IProduct } from "@/models/product";
import { MainRange } from "./Main";

interface ChildProps {
  category: string;
  mainRange: MainRange;
  products: IProduct[];
  categories: string[];
  productNotInCategories?: IProduct[];
}

const CategoryComponent = ({
  category,
  mainRange,
  products,
  categories,
  productNotInCategories,
}: ChildProps) => {
  console.log(productNotInCategories);

  //filter for just products in category
  const categoryProducts =
    category === "others"
      ? productNotInCategories
      : products?.filter((e) => e?.name?.toLowerCase()?.includes(category));

  //fiter for products in category and within filter price range
  const productsWithPriceFilter = categoryProducts?.filter(
    (e) => e?.price >= mainRange.start && e?.price <= mainRange.end,
  );

  //capitalize first letter
  const splitName = category.split("");
  const firstLetter = splitName[0].toUpperCase();
  splitName.shift();
  const mainName = [...firstLetter, ...splitName];

  return (
    <section
      className={` ${productsWithPriceFilter?.length > 0 ? "flex" : "hidden"} flex pt-5 px-4 md:px-[128px] flex-col gap-2 w-full`}
    >
      <div className="font-semibold tracking-[-2%] text-[16px] text-text">
        {`${mainName.join("")} Products`}
      </div>
      <div className="flex shrink-0 pb-4 custom-scrollbar border-b border-border overflow-x-scroll justify-start items-center w-auto min-w-full ">
        {productsWithPriceFilter?.map((product: IProduct) => (
          <div key={product._id.toString()} className={`flex mx-1`}>
            <ProductComponent mainRange={mainRange} product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryComponent;
