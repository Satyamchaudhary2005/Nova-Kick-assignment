"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/store";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { toast } from "sonner";

export default function CartPage() {
  const {
    state,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
    getItemCount,
  } = useCart();

  const [couponInput, setCouponInput] = React.useState("");

  const handleApplyCoupon = () => {
    if (couponInput.toUpperCase() === "NOVA20") {
      applyCoupon(couponInput.toUpperCase());
      toast.success("Coupon applied! You got 20% off!");
      setCouponInput("");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-semibold tracking-widest text-accent uppercase">Cart</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Shopping Cart</h1>
        </motion.div>

        {state.items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added anything yet.</p>
            <Link href="/products">
              <Button size="lg" className="rounded-xl">Browse Products</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-4">
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
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <Link
                        href={`/products/${item.product._id}`}
                        className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-muted/30 flex-shrink-0"
                      >
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/products/${item.product._id}`}
                              className="font-semibold text-base hover:text-accent transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <span>Size: {item.selectedSize}</span>
                              <span>|</span>
                              <span>Color: {item.selectedColor}</span>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.product._id, item.selectedSize, item.selectedColor)
                            }
                            className="p-2 rounded-lg text-muted-foreground hover:text-error hover:bg-error/5 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.product._id, item.selectedSize, item.selectedColor, item.quantity - 1)
                              }
                              className="p-2 hover:bg-muted rounded-l-lg transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className={cn("w-4 h-4", item.quantity <= 1 && "opacity-30")} />
                            </button>
                            <span className="px-4 font-medium">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product._id, item.selectedSize, item.selectedColor, item.quantity + 1)
                              }
                              className="p-2 hover:bg-muted rounded-r-lg transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{formatPrice(discountedPrice * item.quantity)}</div>
                            {item.product.discount > 0 && (
                              <div className="text-sm text-muted-foreground line-through">
                                {formatPrice(item.product.price * item.quantity)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({getItemCount()} items)</span>
                      <span className="font-medium">{formatPrice(getSubtotal())}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {getShipping() === 0 ? <span className="text-success">Free</span> : formatPrice(getShipping())}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="font-medium">{formatPrice(getTax())}</span>
                    </div>
                    {state.coupon && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-success">Coupon ({state.coupon})</span>
                        <span className="font-medium text-success">-{state.discount}%</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">{formatPrice(getTotal())}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-gray-100">
                  <h4 className="font-medium text-sm mb-3">Have a coupon?</h4>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 h-10 rounded-lg text-sm"
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    />
                    {state.coupon ? (
                      <Button variant="outline" size="sm" className="rounded-lg" onClick={() => removeCoupon()}>
                        Remove
                      </Button>
                    ) : (
                      <Button size="sm" className="rounded-lg" onClick={handleApplyCoupon}>
                        Apply
                      </Button>
                    )}
                  </div>
                  {!state.coupon && (
                    <p className="text-xs text-muted-foreground mt-2">Try code &quot;NOVA20&quot; for 20% off!</p>
                  )}
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full h-14 text-base rounded-xl shadow-lg shadow-accent/25">
                    <span className="flex items-center justify-center gap-2">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
