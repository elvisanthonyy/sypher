import mongoose, { Document, models } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  type: string;
  category: string;
  unitsAvailable: Number;
  price: number;
  image: string;
}

const ProdusctSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
    price: {
      type: Number,
      require: true,
    },
    unitsAvailable: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Product =
  models.Product || mongoose.model<IProduct>("Product", ProdusctSchema);
