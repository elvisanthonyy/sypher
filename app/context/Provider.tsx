"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./CartContext";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
