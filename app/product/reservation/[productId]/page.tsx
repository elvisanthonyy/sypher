import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ThirdNav from "@/app/components/profile/ThirdNav";
import ReservationMain from "@/app/components/reservation/ReservationMain";
const baseURL = process.env.BASE_URL;

export const metadata = {
  title: "Order Product",
};

const page = async ({ params }: { params: { productId: string } }) => {
  const req = await params;
  const session = await getServerSession(authOptions);
  console.log(req);

  if (!session) {
    redirect(`/auth/signin?redirectUrl=/product/reservation/${req.productId}`);
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

  const prodRes = await fetch(`${baseURL}/api/product/${req.productId}`);
  const data = await res.json();
  const productData = await prodRes.json();

  return (
    <div className="w-full h-dvh justify-center">
      <ThirdNav pageName="Reservation" />
      <ReservationMain
        user={session?.user}
        product={productData?.product}
        cartItem={data.cartItem}
      />
    </div>
  );
};

export default page;
