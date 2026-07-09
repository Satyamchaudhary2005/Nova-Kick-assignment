"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store";
import { products } from "@/data/products";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl" />

      <div className="container-main relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>New Collection 2026</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
              Step Into
              <br />
              <span className="text-gradient">The Future</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-md mb-8 leading-relaxed">
              Premium sneakers engineered for performance and designed for life. Every pair is a masterpiece of form and function.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="h-14 px-8 text-base rounded-xl shadow-lg shadow-accent/25 group">
                  <span className="flex items-center gap-2">
                    Explore Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="h-14 px-8 text-base rounded-xl border-2">Learn More</Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold">30+</div>
                <div className="text-xs text-muted-foreground mt-1">Premium Styles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15K+</div>
                <div className="text-xs text-muted-foreground mt-1">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-xs text-muted-foreground mt-1">Avg Rating</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ y, opacity }}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-full blur-3xl" />
              <Image
                src={products[0].images[0].url}
                alt="Nova Quantum X1"
                width={600}
                height={600}
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-float"
                priority
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl shadow-black/5 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Free Shipping</div>
                    <div className="font-semibold text-sm">On orders ₹15,000+</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl">
                <div className="text-2xl font-bold">-20%</div>
                <div className="text-xs opacity-80">Limited Offer</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
