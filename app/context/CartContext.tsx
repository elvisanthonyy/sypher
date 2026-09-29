"use client";
import { createContext, useContext } from "react";
import { useState, useEffect, ReactNode } from "react";
import api from "@/libs/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

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
  reduceQty: (itemId: string, newQty: number) => void;
  increaseQty: (itemId: string, newQty: number) => void;
  removeFromCart: (
    id: string | undefined,
    productId: string | undefined,
  ) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [mounted, setMounted] = useState(true);
  const [cookie, setCookie] = useState<string | undefined>();
  const [cart, setCart] = useState<CartItem[]>([]);

  //reduce item quantity
  const reduceQty = (itemId: string, newQty: number) => {
    if (cookie || session) {
      return api
        .post("/api/cart/decreaseqty", { itemId, userId })
        .then((res) => {})
        .catch((error) => console.error(error));
    }
    setCart((prev) => {
      return prev.map((i) => (i._id === itemId ? { ...i, qty: newQty } : i));
    });
  };

  // increase item quantity
  const increaseQty = (itemId: string, newQty: number) => {
    if (cookie || session) {
      return api
        .post("/api/cart/increaseqty", { itemId, userId })
        .then((res) => {})
        .catch((error) => console.error(error));
    }
    setCart((prev) => {
      return prev.map((i) => (i._id === itemId ? { ...i, qty: newQty } : i));
    });
  };

  //add item to cart
  const addToCart = (item: CartItem) => {
    //if user accepts cookies or is logged in
    if (cookie || session) {
      return api
        .post("/api/cart/add", {
          cartId: cookie,
          userId: session?.user?.id,
          productId: item._id,
          name: item?.name,
          type: item?.type,
          category: item?.category,
          price: item.price,
          qty: 1,
          imageURL: item?.image?.url,
        })
        .then((res) => {
          setCart((prev) => {
            return [...prev, item];
          });
          if (res.data.status === "okay") {
            setTimeout(() => {
              //window.location.reload();
            }, 1000);
            toast.success(res.data.message, {
              theme: "dark",
              position: "top-center",
            });
          } else {
            toast.error(res.data.message, {
              theme: "dark",
              position: "top-center",
            });
          }
        })
        .catch((error) => {
          console.error("error", error);
        });
    }

    //if user does not accept cookies or is not logged in
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === item._id || i._id === item._id,
      );

      if (existing) {
        toast.error("Product is already in cart", {
          theme: "dark",
          position: "top-center",
        });

        return prev.map((i) =>
          i._id === item._id
            ? { ...i, qty: (i.qty ?? 0) + (item.qty ?? 0) }
            : i,
        );
      }
      toast.success("Product has been added to cart", {
        theme: "dark",
        position: "top-center",
      });
      return [...prev, item];
    });
  };

  // id for localstorage || productId for database
  const removeFromCart = (
    id: string | undefined,
    productId: string | undefined,
  ) => {
    if (cookie || session) {
      return api
        .post("/api/cart/delete", {
          userId: session?.user?.id,
          cartId: cookie,
          productId: productId,
        })
        .then((res) => {
          setCart((prev) => prev.filter((i) => i.productId !== id));
        })
        .catch((error) => {
          console.error("error", error);
        });
    }
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    setCart((prev) => prev.map((i) => (i._id === id ? { ...i, qty } : i)));
  };
  //clear cart
  const clearCart = () => {
    if (!session && !cookie) {
      setCart([]);
    } else {
      api
        .post("/api/cart/clear", { userId: session?.user?.id, cartId: cookie })
        .then((res) => {
          setCart([]);
        })
        .catch((error) => [console.error("error", error)]);
    }
  };
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
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } else {
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
  }, [cart, cookie, session]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        reduceQty,
        increaseQty,
      }}
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
