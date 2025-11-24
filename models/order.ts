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
}

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
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
