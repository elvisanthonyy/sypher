import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const handler = async () => {
  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: "cart_id",
    value: randomUUID(),
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
};

export { handler as GET };
