import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { products } from "@/data/products";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p._id === id);
  if (!product) return { title: "Product Not Found — Nova Kicks" };
  return {
    title: `${product.name} — Nova Kicks`,
    description: product.description,
    openGraph: {
      images: [{ url: product.images[0].url }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
