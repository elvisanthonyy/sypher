import mongoose, { Document, models, Schema, Model } from "mongoose";

export interface IOrder extends Document {
  _id: string;
  userId: string;
  name: string;
  email: string;
  productId: string;
  productName: string;
  location: string;
  price: number;
  qty: number;
  createdAt: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    userId: {
      type: String,
      ref: "User",
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    productId: {
      type: String,
      ref: "Product",
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    qty: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order: Model<IOrder> =
  models.Order || mongoose.model<IOrder>("Order", OrderSchema);
