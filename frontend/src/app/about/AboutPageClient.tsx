"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Zap, Award, Users } from "lucide-react";

const stats = [
  { label: "Premium Styles", value: "30+", icon: Award },
  { label: "Happy Customers", value: "15K+", icon: Users },
  { label: "Years Experience", value: "5+", icon: Zap },
  { label: "Quality Guarantee", value: "100%", icon: Shield },
];

const values = [
  {
    title: "Innovation First",
    description: "We push the boundaries of sneaker design with cutting-edge materials and technology.",
  },
  {
    title: "Uncompromising Quality",
    description: "Every pair undergoes rigorous testing to ensure it meets our exacting standards.",
  },
  {
    title: "Sustainability",
    description: "We're committed to reducing our environmental footprint through sustainable practices.",
  },
  {
    title: "Community Driven",
    description: "We build for our community, listening and evolving with every collection.",
  },
];

export default function AboutPageClient() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-28"
        >
          <div>
            <span className="text-xs font-semibold tracking-widest text-accent uppercase">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
              Redefining <span className="text-gradient">Premium</span> Footwear
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Nova Kicks was born from a simple idea: why settle for sneakers that force you to choose between style and comfort? We believe you deserve both.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2021, our team of designers, engineers, and athletes has worked tirelessly to create footwear that performs as good as it looks. Every pair is a testament to our commitment to quality, innovation, and design excellence.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3"
                alt="Nova Kicks Craftsmanship"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl shadow-black/5 border border-gray-100">
              <div className="text-3xl font-bold text-accent">2021</div>
              <div className="text-sm text-muted-foreground">Founded in NYC</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 text-center"
            >
              <stat.icon className="w-6 h-6 text-accent mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-semibold tracking-widest text-accent uppercase">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">What We Stand For</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100"
              >
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
