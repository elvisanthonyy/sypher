import Nav from "@/app/components/nav/Nav";
import CartMain from "@/app/components/cart/CartMain";
import ThirdNav from "@/app/components/profile/ThirdNav";

const page = () => {
  return (
    <div className="flex w-full">
      <ThirdNav pageName="Cart" />
      <CartMain />
    </div>
  );
};

export default page;
