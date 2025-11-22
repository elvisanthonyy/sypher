"use client";

export const getCookies = () => {
  const cookies = document.cookie;
  const match = cookies.split("; ").find((row) => row.startsWith("cart_id"));
  if (match) {
    return match.split("=")[1];
  } else {
    return undefined;
  }
};
