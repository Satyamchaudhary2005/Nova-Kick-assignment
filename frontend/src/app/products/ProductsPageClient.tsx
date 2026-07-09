"use client";

import React from "react";
import { motion } from "framer-motion";
import ProductGrid from "@/components/products/ProductGrid";

export default function ProductsPageClient() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-semibold tracking-widest text-accent uppercase">Collection</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">All Products</h1>
          <p className="text-muted-foreground max-w-xl">
            Explore our complete collection of premium sneakers. Each pair is engineered for performance and designed for life.
          </p>
        </motion.div>
        <ProductGrid />
      </div>
    </div>
  );
}
