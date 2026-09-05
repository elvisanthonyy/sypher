import mongoose, { Document, models, Model, Types } from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  type: string;
  category: string;
  unitsAvailable: Number;
  price: number;
  image: {
    filename: string;
    url: string;
  };
  specifications: [string];
}

const ProdusctSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
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
    price: {
      type: Number,
      required: true,
    },
    unitsAvailable: {
      type: Number,
      required: true,
    },
    image: {
      url: String,
      filename: String,
    },
    specifications: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

export const Product: Model<IProduct> =
  models.Product || mongoose.model<IProduct>("Product", ProdusctSchema);
