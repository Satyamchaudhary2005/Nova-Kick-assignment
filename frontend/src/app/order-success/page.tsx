"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

function OrderContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const orders: Order[] = JSON.parse(localStorage.getItem("novakicks-orders") || "[]");
      const found = orders.find((o) => o.id === orderId);
      setOrder(found || null);
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="pt-24 pb-20">
        <div className="container-main text-center py-20">
          <h1 className="text-4xl font-bold mb-4">No Order Found</h1>
          <Link href="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-success" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Thank you for your purchase. Your order has been placed successfully.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium mb-8">
            <Package className="w-4 h-4" />
            <span>Order #{orderId}</span>
          </div>

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 text-left mb-8"
            >
              <h3 className="font-semibold text-lg mb-4">Order Details</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.product._id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{item.product.name}</div>
                      <div className="text-xs text-muted-foreground">Qty: {item.quantity} | {item.selectedSize}</div>
                    </div>
                    <div className="font-semibold text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="rounded-xl">
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-xl">Back to Home</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 pb-20">
        <div className="container-main text-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    }>
      <OrderContent />
    </Suspense>
  );
}
