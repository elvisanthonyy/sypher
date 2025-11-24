import mongoose, { Document, models, Model } from "mongoose";

export interface IItem extends Document {
  _id: string;
  productId?: string;
  name: string;
  type: string;
  category: string;
  price: number;
  qty: number;
  unitsAvailable: number;
  image: {
    url: string;
    filename: string;
  };
}

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: string;
  address: string;
  countryCode: number;
  number: number;
  gender: string;
  verified: boolean;
  dateOfBirth: Date;
  otp: string;
  otpExpires: Date;
  resetToken: string;
  resetTokenExpiry: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
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
      required: true,
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
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> =
  models.User || mongoose.model<IUser>("User", UserSchema);
