import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Session } from "next-auth";
import Main from "./components/Main/Main";
import Nav from "./components/nav/Nav";
import dbConnect from "@/libs/dbConnect";
import { title } from "process";

const baseURL = process.env.BASE_URL;

export const metadata = {
  title: "Home",
};

export default async function Home() {
  await dbConnect();
  const session: Session | null = await getServerSession(authOptions);
  //api call to get products
  const res = await fetch(`${baseURL}/api/product/get`);

  const data = await res.json();
  console.log(data);
  return (
    <div className="">
      <Nav />

      <Main session={session} products={data.products} />
    </div>
  );
}
