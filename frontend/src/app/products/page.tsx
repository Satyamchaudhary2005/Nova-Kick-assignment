import type { Metadata } from "next";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "All Products — Nova Kicks",
  description: "Browse our complete collection of premium sneakers. Find your perfect pair from running, lifestyle, and sports categories.",
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
