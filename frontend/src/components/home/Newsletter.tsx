"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      toast.success("Welcome to Nova Kicks! Check your inbox for your 10% discount code.");
      setEmail("");
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent/90 p-8 md:p-16 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-md mx-auto">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Stay in the Loop
            </h2>
            <p className="text-white/70 mb-8">
              Subscribe to get 10% off your first order and be the first to know about new drops, exclusive offers, and behind-the-scenes content.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-3 text-white bg-white/10 rounded-xl px-6 py-4"
              >
                <Check className="w-5 h-5 text-success" />
                <span className="font-medium">You&apos;re subscribed!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:bg-white/20"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-12 px-6 bg-white text-primary hover:bg-white/90 rounded-xl shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
            <p className="text-xs text-white/40 mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
