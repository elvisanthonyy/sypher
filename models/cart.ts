import mongoose, { Document, Schema, Model } from "mongoose";
import { IItem } from "./user";

export interface ICart extends Document {
  _id: string;
  userId: string;
  cartId: string;
  items: IItem[];
}

const CartItemSchema = new Schema<IItem>({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const CartSchema = new mongoose.Schema<ICart>({
  userId: {
    type: String,
    ref: "User",
  },
  cartId: {
    type: String,
  },
  items: [CartItemSchema],
});

export const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
