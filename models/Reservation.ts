import mongoose, { Document, models, Schema, Model, Types } from "mongoose";

export interface IReservation extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  email: string;
  productId: string;
  productName: string;
  location: string;
  price: number;
  qty: number;
  createdAt: Date;
  status: [string];
}

const ReservationSchema = new mongoose.Schema<IReservation>(
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
    status: {
      type: [String],
      enum: ["pending", "pending", "success", "cancelled"],
      default: ["pending"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Reservation: Model<IReservation> =
  models.Reservation ||
  mongoose.model<IReservation>("Reservation", ReservationSchema);
