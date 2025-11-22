import mongoose, { Document, models, Schema } from "mongoose";
import { IItem } from "./user";

export interface ICart extends Document {
  _id: string;
  userId: string;
  cartId: string;
  items: IItem[];
}

const CartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  qty: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  cartId: {
    type: String,
  },
  items: [CartItemSchema],
});

export const Cart = models.Cart || mongoose.model<ICart>("Cart", CartSchema);
