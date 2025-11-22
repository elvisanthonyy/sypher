"use client";

import { useContext, createContext, useState, ReactNode } from "react";
import { CartItem } from "@/app/context/CartContext";

interface ProductContextType {
  product: CartItem | undefined;
  setProduct: (Product: CartItem) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<CartItem>();

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const ctx = useContext(ProductContext);
  if (!ctx)
    throw new Error("useProductContex must be used inside productProvider");
  return ctx;
}
