"use client";
import { createContext, useContext } from "react";
import { useState, useEffect, ReactNode } from "react";
import api from "@/libs/api";
import { useSession } from "next-auth/react";

export interface CartItem {
  _id?: string | undefined;
  name?: string | undefined;
  type?: string | undefined;
  category?: string | undefined;
  price?: number | undefined;
  qty?: number | undefined;
  productId?: string | undefined;
  unitsAvailable?: number | undefined;
  image: {
    filename: string;
    url: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    id: string | undefined,
    productId: string | undefined
  ) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [cookie, setCookie] = useState<string | undefined>();
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === item._id || i._id === item._id
      );

      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: (i.qty ?? 0) + (item.qty ?? 0) } : i
        );
      }
      return [...prev, item];
    });
    if (cookie || session) {
      api
        .post("/api/cart/add", {
          cartId: cookie,
          userId: session?.user?.id,
          productId: item._id,
          name: item?.name,
          type: item?.type,
          category: item?.category,
          price: item.price,
          qty: item.qty,
          imageURL: item?.image?.url,
        })
        .then()
        .catch((error) => {
          console.error("error", error);
        });
    }
  };

  // id for localstorage || productId for database
  const removeFromCart = (
    id: string | undefined,
    productId: string | undefined
  ) => {
    if (cookie || session) {
      api
        .post("/api/cart/delete", {
          userId: session?.user?.id,
          cartId: cookie,
          productId: productId,
        })
        .then((res) => {})
        .catch((error) => {
          console.error("error", error);
        });
    }
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    setCart((prev) => prev.map((i) => (i._id === id ? { ...i, qty } : i)));
  };
  const clearCart = () => setCart([]);
  useEffect(() => {
    //return nothing if session is loading
    if (status === "loading") return;

    //check for cookies
    const cookies = document.cookie;
    const match = cookies
      .split("; ")
      .find((row) => row.startsWith("cart_id"))
      ?.split("=")[1];
    setCookie(match ? match : undefined);

    //if there is no session at all get from localstorage
    if (!match && !session) {
      console.log("hello");
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } else {
      console.log("no");
      api
        .post("/api/cart/getitems", {
          cartId: match,
          userId: session?.user?.id,
        })
        .then((response) => {
          if (response.data.status === "okay") {
            setCart(response.data.cart ? response.data.cart : []);
          }
        })
        .catch((error) => {
          console.error("error", error);
        });
    }
  }, [status, session]);

  useEffect(() => {
    if (cart?.length === 0) return;
    if (!cookie && !session) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be within CartProvider");
  return context;
}
