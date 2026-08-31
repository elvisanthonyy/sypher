import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ThirdNav from "@/app/components/profile/ThirdNav";
import OrderMain from "@/app/components/order/OrderMain";
import { NextRequest } from "next/server";
import { Product } from "@/models/product";
const baseURL = process.env.BASE_URL;

export const metadata = {
  title: "Order Product",
};

const page = async ({ params }: { params: { productId: string } }) => {
  const req = await params;
  const session = await getServerSession(authOptions);
  console.log(req);

  if (!session) {
    redirect(`/auth/signin?redirectUrl=/product/order/${req.productId}`);
  }

  const res = await fetch(`${baseURL}/api/cart/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: session.user.id,
      itemId: req.productId,
    }),
  });
  const data = await res.json();
  console.log(data);
  return (
    <div className="w-full pt-[80px] h-dvh justify-center">
      <ThirdNav pageName="Order" />
      <OrderMain user={session?.user} cartItem={data.cartItem} />
    </div>
  );
};

export default page;
