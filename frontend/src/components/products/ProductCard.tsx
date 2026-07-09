"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, Eye, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();

  const discountedPrice = product.discount
    ? calculateDiscount(product.price, product.discount)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div
        className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:shadow-black/5 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/products/${product._id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            {!imgError ? (
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={cn(
                  "object-cover transition-all duration-700",
                  isHovered ? "scale-110" : "scale-100"
                )}
                onError={() => setImgError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
              </div>
            )}

            {isHovered && product.images[1] && !imgError && (
              <Image
                src={product.images[1].url}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                loading="lazy"
              />
            )}

            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-accent text-white border-none text-xs px-2.5 py-1">New</Badge>
              )}
              {product.discount > 0 && (
                <Badge className="bg-error text-white border-none text-xs px-2.5 py-1">
                  -{product.discount}%
                </Badge>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className={cn(
                "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                isWishlisted
                  ? "bg-error/10 text-error"
                  : "bg-white/80 backdrop-blur-sm text-muted-foreground hover:bg-white opacity-0 group-hover:opacity-100"
              )}
            >
              <Heart className={cn("w-4 h-4", isWishlisted && "fill-error")} />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Button
                size="sm"
                className="w-full rounded-xl bg-white text-primary hover:bg-white/90 shadow-lg backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product);
                }}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </Link>

        <div className="p-4 md:p-5">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews.length})</span>
          </div>
          <Link href={`/products/${product._id}`}>
            <h3 className="font-semibold text-sm md:text-base line-clamp-1 hover:text-accent transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="text-xs text-muted-foreground mt-1">{product.category}</div>
          <div className="flex items-center gap-2 mt-2">
            {discountedPrice ? (
              <>
                <span className="font-bold text-base">{formatPrice(discountedPrice)}</span>
                <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="font-bold text-base">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
