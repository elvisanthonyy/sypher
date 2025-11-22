import mongoose, { Document, models } from "mongoose";

export interface IItem extends Document {
  productId?: string;
  name: string;
  type: string;
  category: string;
  price: string;
  qty: number;
}

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: string;
  address: string;
  country: number;
  number: number;
  gender: string;
  verified: boolean;
  dateOfBirth: Date;
  otp: string;
  otpExpires: Date;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      require: true,
    },
    address: {
      type: String,
    },
    countryCode: {
      type: Number,
      enum: [234],
    },
    number: {
      type: Number,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: {
      type: Date,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || mongoose.model<IUser>("User", UserSchema);
