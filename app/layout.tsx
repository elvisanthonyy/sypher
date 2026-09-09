import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./context/Provider";
import { ProductProvider } from "./context/ProductContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Max Gadgets",
  description:
    "Max Gadgets is a leading online retailer of electronics and gadgets, offering a wide range of products from top brands. Shop with confidence and enjoy fast shipping and excellent customer service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ProductProvider>
          <Providers>{children}</Providers>
        </ProductProvider>
        <ToastContainer hideProgressBar={true} autoClose={1000} />
      </body>
    </html>
  );
}
