"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Lock, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/store";
import { formatPrice, calculateDiscount, generateOrderId } from "@/lib/utils";
import type { ShippingInfo } from "@/types";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { state, getSubtotal, getShipping, getTax, getTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"form" | "payment" | "processing" | "success">("form");

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

  const validateForm = () => {
    const newErrors: Partial<ShippingInfo> = {};
    if (!shippingInfo.firstName.trim()) newErrors.firstName = "Required";
    if (!shippingInfo.lastName.trim()) newErrors.lastName = "Required";
    if (!shippingInfo.email.trim()) newErrors.email = "Required";
    if (!shippingInfo.address.trim()) newErrors.address = "Required";
    if (!shippingInfo.city.trim()) newErrors.city = "Required";
    if (!shippingInfo.state.trim()) newErrors.state = "Required";
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (state.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setStep("payment");
  };

  const handlePayment = () => {
    if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv) {
      toast.error("Please fill in all card details");
      return;
    }
    setIsProcessing(true);
    setStep("processing");

    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
      const orderId = generateOrderId();
      const orders = JSON.parse(localStorage.getItem("novakicks-orders") || "[]");
      orders.unshift({
        id: orderId,
        items: state.items,
        shippingInfo,
        subtotal: getSubtotal(),
        shipping: getShipping(),
        tax: getTax(),
        total: getTotal(),
        status: "confirmed",
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("novakicks-orders", JSON.stringify(orders));
      clearCart();
      toast.success("Payment successful!");
      setTimeout(() => router.push(`/order-success?id=${orderId}`), 1500);
    }, 2500);
  };

  if (state.items.length === 0 && step === "form") {
    return (
      <div className="pt-24 pb-20">
        <div className="container-main text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to your cart before checking out.</p>
          <Link href="/products">
            <Button>Shop Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return null;
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-xs font-semibold tracking-widest text-accent uppercase">Checkout</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Complete Your Order</h1>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3 space-y-8">
            {step === "form" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100"
              >
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      className="mt-1.5"
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-xs text-error mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      className="mt-1.5"
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-xs text-error mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="mt-1.5"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="mt-1.5"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="mt-1.5"
                      placeholder="123 Main Street, Apt 4B"
                    />
                    {errors.address && <p className="text-xs text-error mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="mt-1.5"
                      placeholder="New York"
                    />
                    {errors.city && <p className="text-xs text-error mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      className="mt-1.5"
                      placeholder="NY"
                    />
                    {errors.state && <p className="text-xs text-error mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      className="mt-1.5"
                      placeholder="10001"
                    />
                    {errors.zipCode && <p className="text-xs text-error mt-1">{errors.zipCode}</p>}
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <Button size="lg" className="w-full mt-8 h-14 text-base rounded-xl" onClick={handleSubmit}>
                  Continue to Payment
                </Button>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Payment Details</h2>
                  <CreditCard className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  This is a mock payment. No real charges will be made.
                </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      value={cardInfo.name}
                      onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                      className="mt-1.5"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={cardInfo.number}
                      onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                      className="mt-1.5"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        value={cardInfo.expiry}
                        onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                        className="mt-1.5"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="password"
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                        className="mt-1.5"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <Button variant="outline" size="lg" className="flex-1 h-14 rounded-xl" onClick={() => setStep("form")}>
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 h-14 text-base rounded-xl shadow-lg shadow-accent/25"
                    onClick={handlePayment}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Pay {formatPrice(getTotal())}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-2xl bg-white border border-gray-100 text-center"
              >
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
                <p className="text-muted-foreground">Please wait while we process your order...</p>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-28 p-6 md:p-8 rounded-2xl bg-white border border-gray-100">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
                {state.items.map((item) => {
                  const discountedPrice = item.product.discount
                    ? calculateDiscount(item.product.price, item.product.discount)
                    : item.product.price;
                  return (
                    <div key={`${item.product._id}-${item.selectedSize}`} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted/30 flex-shrink-0">
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium line-clamp-1">{item.product.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.selectedSize} | Qty: {item.quantity}
                        </div>
                        <div className="text-sm font-semibold mt-1">{formatPrice(discountedPrice * item.quantity)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {getShipping() === 0 ? <span className="text-success">Free</span> : formatPrice(getShipping())}
                  </span>
                </div>
                {state.discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-success">Discount ({state.discount}%)</span>
                    <span className="text-success">-{formatPrice(getSubtotal() * (state.discount / 100))}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(getTax())}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">{formatPrice(getTotal())}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 pt-4 border-t border-gray-100">
                <Lock className="w-3 h-3" />
                <span>Secure checkout powered by Nova Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
