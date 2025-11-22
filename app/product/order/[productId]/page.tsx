import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileNav from "@/app/components/profile/ProfileNav";
import OrderMain from "@/app/components/order/OrderMain";

const baseURL = process.env.BASE_URL;

const page = async ({ params }: { params: { productId: string } }) => {
  const req = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
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
    <div className="w-full pt-25 h-dvh justify-center">
      <ProfileNav />
      <OrderMain user={session?.user} cartItem={data.cartItem} />
    </div>
  );
};

export default page;
