"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/store";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { state, removeItem, updateQuantity, getSubtotal, getTotal, getItemCount } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-semibold text-lg">Cart ({getItemCount()})</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Looks like you haven&apos;t added anything yet.
                  </p>
                  <Link href="/products">
                    <Button onClick={onClose}>Browse Products</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {state.items.map((item) => {
                      const discountedPrice = item.product.discount
                        ? calculateDiscount(item.product.price, item.product.discount)
                        : item.product.price;
                      return (
                        <motion.div
                          key={`${item.product._id}-${item.selectedSize}-${item.selectedColor}`}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          className="flex gap-4 p-3 rounded-xl bg-muted/50 group"
                        >
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                            <Image
                              src={item.product.images[0].url}
                              alt={item.product.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${item.product._id}`}
                              className="font-medium text-sm hover:text-accent transition-colors line-clamp-1"
                              onClick={onClose}
                            >
                              {item.product.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <span>{item.selectedSize}</span>
                              <span>|</span>
                              <span>{item.selectedColor}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 border border-gray-200 rounded-lg">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product._id, item.selectedSize, item.selectedColor, item.quantity - 1)
                                  }
                                  className="p-1.5 hover:bg-muted rounded-l-lg transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className={cn("w-3.5 h-3.5", item.quantity <= 1 && "opacity-30")} />
                                </button>
                                <span className="px-3 text-sm font-medium min-w-[24px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product._id, item.selectedSize, item.selectedColor, item.quantity + 1)
                                  }
                                  className="p-1.5 hover:bg-muted rounded-r-lg transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">
                                  {formatPrice(discountedPrice * item.quantity)}
                                </span>
                                <button
                                  onClick={() =>
                                    removeItem(item.product._id, item.selectedSize, item.selectedColor)
                                  }
                                  className="p-1.5 rounded-lg text-muted-foreground hover:text-error hover:bg-error/10 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {state.items.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">{formatPrice(getTotal())}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link href="/cart">
                    <Button variant="outline" className="flex-1" onClick={onClose}>View Cart</Button>
                  </Link>
                  <Link href="/checkout">
                    <Button className="flex-1" onClick={onClose}>
                      Checkout <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
