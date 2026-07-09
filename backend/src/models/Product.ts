import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  discount: number;
  rating: number;
  stock: number;
  images: { id: string; url: string; alt: string }[];
  sizes: { size: string; inStock: boolean }[];
  colors: { name: string; hex: string; inStock: boolean }[];
  reviews: { id: string; name: string; rating: number; date: string; comment: string; avatar: string }[];
  features: string[];
  specifications: { label: string; value: string }[];
  isNewArrival: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  createdAt: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, index: "text" },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    subcategory: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    images: [
      {
        id: String,
        url: String,
        alt: String,
      },
    ],
    sizes: [
      {
        size: String,
        inStock: Boolean,
      },
    ],
    colors: [
      {
        name: String,
        hex: String,
        inStock: Boolean,
      },
    ],
    reviews: [
      {
        id: String,
        name: String,
        rating: Number,
        date: String,
        comment: String,
        avatar: String,
      },
    ],
    features: [String],
    specifications: [
      {
        label: String,
        value: String,
      },
    ],
  isNewArrival: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
