import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  id: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }[];
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: string;
  createdAt: string;
}

const OrderSchema = new Schema<IOrder>(
  {
    id: { type: String, required: true, unique: true },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        size: String,
        color: String,
        image: String,
      },
    ],
    shippingInfo: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    subtotal: Number,
    shipping: Number,
    tax: Number,
    discount: Number,
    total: Number,
    status: { type: String, default: "confirmed" },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
