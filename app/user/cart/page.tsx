import Nav from "@/app/components/nav/Nav";
import CartMain from "@/app/components/cart/CartMain";

const page = () => {
  return (
    <div className="flex w-full">
      <Nav />
      <CartMain />
    </div>
  );
};

export default page;
