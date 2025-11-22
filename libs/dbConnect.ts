import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Invalid mongo uri");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) {
    console.log("already connected");
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.connection.on("connected", () => {
      console.log("just connected");
    });
    mongoose.connection.on("error", (err) => {
      console.log("could not connect", err);
    });
    cached.promise = mongoose
      .connect(MONGODB_URI!)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

(global as any).mongoose = cached;
