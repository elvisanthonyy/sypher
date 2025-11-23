import ProductMain from "@/app/components/product/ProductMain";
import Nav from "@/app/components/nav/Nav";

const baseURL = process.env.BASE_URL;

const page = async ({ params }: { params: { productId: string } }) => {
  const req = await params;
  const res = await fetch(`${baseURL}/api/product/${req.productId}`);
  const data = await res.json();
  console.log(data);
  return (
    <div className=" flex w-full min-h-dvh">
      <Nav />
      <ProductMain productProp={data.product} />
    </div>
  );
};

export default page;
