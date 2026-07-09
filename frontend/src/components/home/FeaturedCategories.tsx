"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";

const categoryImages: Record<string, { emoji: string; gradient: string }> = {
  running: { emoji: "🏃", gradient: "from-blue-400 to-blue-600" },
  lifestyle: { emoji: "👟", gradient: "from-purple-400 to-purple-600" },
  sports: { emoji: "⚡", gradient: "from-orange-400 to-red-500" },
};

export default function FeaturedCategories() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-xs font-semibold tracking-widest text-accent uppercase">Categories</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Shop by Category</h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            View All Categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.filter((c) => c.slug !== "all").map((category, index) => {
            const img = categoryImages[category.slug] || { emoji: "👟", gradient: "from-gray-400 to-gray-600" };
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/products?category=${category.slug}`}
                  className={cn(
                    "group relative block overflow-hidden rounded-3xl p-8 md:p-10",
                    "bg-gradient-to-br",
                    img.gradient,
                    "text-white"
                  )}
                >
                  <div className="relative z-10">
                    <span className="text-5xl md:text-6xl mb-4 block">{img.emoji}</span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/70 text-sm mb-6">
                      Explore our collection of premium {category.name.toLowerCase()} sneakers.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 group-hover:bg-white/30 transition-colors">
                      Shop Now
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
