"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Truck, RefreshCw, HeadphonesIcon, Award, Zap } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders over ₹15,000. Fast and reliable delivery worldwide.",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Every pair is crafted with premium materials and undergoes rigorous quality control.",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not satisfied? Return any item within 30 days for a full refund, no questions asked.",
    gradient: "from-green-400 to-green-600",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to help you with any questions.",
    gradient: "from-orange-400 to-orange-600",
  },
  {
    icon: Award,
    title: "2-Year Warranty",
    description: "All Nova Kicks products come with a comprehensive 2-year warranty against defects.",
    gradient: "from-pink-400 to-pink-600",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Express shipping options available. Most orders deliver within 2-5 business days.",
    gradient: "from-yellow-400 to-yellow-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-accent uppercase">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Designed for Excellence</h2>
          <p className="text-muted-foreground">
            We don&apos;t just make sneakers. We engineer experiences. Every detail is meticulously crafted to deliver unmatched quality and comfort.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 md:p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
