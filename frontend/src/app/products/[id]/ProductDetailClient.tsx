"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star, Heart, ShoppingBag, Minus, Plus, ChevronLeft, ChevronRight,
  Truck, Shield, RefreshCw, Check, Ruler, Package,
  Layers, Weight, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/lib/store";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { toast } from "sonner";

interface Props {
  id: string;
}

function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200", className)}>
      <Package className="w-16 h-16 text-gray-300" />
    </div>
  );
}

export default function ProductDetailClient({ id }: Props) {
  const product = products.find((p) => p._id === id);
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [showMobileSticky, setShowMobileSticky] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const addToCartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!addToCartRef.current) return;
      const rect = addToCartRef.current.getBoundingClientRect();
      setShowMobileSticky(rect.bottom < 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Product Not Found</h1>
          <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
            This product may have been removed or doesn&apos;t exist.
          </p>
          <Link href="/products">
            <Button className="rounded-xl">Browse All Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? calculateDiscount(product.price, product.discount)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    addItem(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart!`, {
      description: `${selectedSize} · ${selectedColor} · Qty: ${quantity}`,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleImgError = (imgId: string) => {
    setImgErrors((prev) => ({ ...prev, [imgId]: true }));
  };

  const getImgUrl = (url: string) => {
    if (imgErrors[url]) return "";
    return `${url}?w=800&q=80&fit=crop`;
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return (
    <div className="pt-20 pb-20">
      <div className="container-main">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 overflow-x-auto no-scrollbar py-2">
          <Link href="/" className="hover:text-primary transition-colors shrink-0">Home</Link>
          <span className="shrink-0">/</span>
          <Link href="/products" className="hover:text-primary transition-colors shrink-0">Products</Link>
          <span className="shrink-0">/</span>
          <Link
            href={`/products?category=${product.category.toLowerCase()}`}
            className="hover:text-primary transition-colors shrink-0"
          >
            {product.category}
          </Link>
          <span className="shrink-0">/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              ref={imageRef}
              className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 mb-3 lg:mb-4 group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              {getImgUrl(product.images[selectedImage].url) ? (
                <Image
                  src={getImgUrl(product.images[selectedImage].url)}
                  alt={product.images[selectedImage].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={cn(
                    "object-cover transition-transform duration-700 ease-out",
                    isZoomed && "scale-150"
                  )}
                  style={
                    isZoomed
                      ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                      : undefined
                  }
                  priority
                  onError={() => handleImgError(product.images[selectedImage].url)}
                />
              ) : (
                <ImagePlaceholder className="w-full h-full" />
              )}

              <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                {product.isNew && (
                  <Badge className="bg-accent text-white border-none shadow-lg shadow-accent/30">New</Badge>
                )}
                {product.discount > 0 && (
                  <Badge className="bg-error text-white border-none shadow-lg shadow-error/30">
                    -{product.discount}% OFF
                  </Badge>
                )}
              </div>

              <button className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-error hover:bg-white transition-all shadow-lg opacity-0 group-hover:opacity-100">
                <Heart className="w-5 h-5" />
              </button>

              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all",
                      selectedImage === i
                        ? "bg-white w-4 shadow-lg"
                        : "bg-white/50 hover:bg-white/80"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all",
                    selectedImage === i
                      ? "border-accent ring-2 ring-accent/20 shadow-md"
                      : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                  )}
                >
                  {getImgUrl(img.url) ? (
                    <Image
                      src={getImgUrl(img.url)}
                      alt={img.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                      onError={() => handleImgError(img.url)}
                    />
                  ) : (
                    <ImagePlaceholder className="w-full h-full" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} · {product.reviews.length} review{product.reviews.length !== 1 ? "s" : ""}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight">{product.name}</h1>

            <div className="flex items-baseline gap-3 mb-5">
              {discountedPrice ? (
                <>
                  <span className="text-3xl font-bold">{formatPrice(discountedPrice)}</span>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
                  <Badge className="bg-error/10 text-error border-none text-xs">Save {product.discount}%</Badge>
                </>
              ) : (
                <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">{product.description}</p>

            <div className="flex-1 space-y-5 mb-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-sm">Select Size</span>
                  <button className="text-xs text-accent hover:underline flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5" />
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s.size)}
                      disabled={!s.inStock}
                      className={cn(
                        "py-2.5 sm:py-3 rounded-xl text-sm font-medium border transition-all",
                        selectedSize === s.size
                          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : s.inStock
                          ? "border-gray-200 hover:border-primary hover:text-primary bg-white"
                          : "border-gray-100 text-muted-foreground/40 line-through cursor-not-allowed bg-gray-50"
                      )}
                    >
                      {s.size.replace("US ", "")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3">
                  <span className="font-medium text-sm">Color: </span>
                  <span className="text-sm text-muted-foreground">{selectedColor || "Select a color"}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      disabled={!c.inStock}
                      className={cn(
                        "relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all",
                        selectedColor === c.name
                          ? "border-primary ring-2 ring-primary/20 scale-110 shadow-md"
                          : "border-gray-200 hover:border-gray-400",
                        !c.inStock && "opacity-30 cursor-not-allowed"
                      )}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className="absolute inset-0 m-auto w-3.5 h-3.5 text-white drop-shadow" />
                      )}
                      {!c.inStock && (
                        <span className="absolute inset-0 m-auto w-full h-0.5 bg-muted-foreground/50 rotate-45" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-medium text-sm mb-3 block">Quantity</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 sm:p-3 hover:bg-muted rounded-l-xl transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-5 sm:px-6 font-medium min-w-[40px] text-center text-sm sm:text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2.5 sm:p-3 hover:bg-muted rounded-r-xl transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm">
                    {product.stock > 10 ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-success font-medium">In Stock</span>
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="text-error font-medium">Only {product.stock} left</span>
                    ) : (
                      <span className="text-error font-medium">Out of Stock</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div ref={addToCartRef} className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                size="lg"
                className="flex-1 h-12 sm:h-14 text-base rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart — {formatPrice(discountedPrice || product.price)}
              </Button>
              <Button size="lg" variant="outline" className="h-12 sm:h-14 px-6 rounded-xl border-2">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 sm:p-5 bg-gradient-to-br from-muted/80 to-muted/30 rounded-2xl border border-gray-100/50">
              <div className="text-center">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-4 h-4 text-accent" />
                </div>
                <div className="text-xs font-medium">Free Shipping</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">On orders ₹15,000+</div>
              </div>
              <div className="text-center">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2">
                  <RefreshCw className="w-4 h-4 text-accent" />
                </div>
                <div className="text-xs font-medium">30-Day Returns</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">No questions asked</div>
              </div>
              <div className="text-center">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-4 h-4 text-accent" />
                </div>
                <div className="text-xs font-medium">2-Year Warranty</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Peace of mind</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-24">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto gap-0 overflow-x-auto no-scrollbar">
              <TabsTrigger
                value="description"
                className="flex-none pb-3 sm:pb-4 px-4 sm:px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent text-sm sm:text-base"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="flex-none pb-3 sm:pb-4 px-4 sm:px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent text-sm sm:text-base"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="flex-none pb-3 sm:pb-4 px-4 sm:px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent text-sm sm:text-base"
              >
                Reviews ({product.reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-6 sm:pt-8">
              <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
                <div className="md:col-span-3">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1 h-5 rounded-full bg-accent" />
                      <h3 className="text-xl sm:text-2xl font-semibold">About This Product</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1 h-5 rounded-full bg-accent" />
                      <h4 className="text-lg font-semibold">Key Features</h4>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {product.features.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-100"
                        >
                          <span className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-success" />
                          </span>
                          <span className="text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1 h-5 rounded-full bg-accent" />
                      <h4 className="text-lg font-semibold">Care Instructions</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-3 py-1.5 rounded-full bg-muted border border-gray-100">
                        Clean with damp cloth
                      </span>
                      <span className="text-xs px-3 py-1.5 rounded-full bg-muted border border-gray-100">
                        Air dry only
                      </span>
                      <span className="text-xs px-3 py-1.5 rounded-full bg-muted border border-gray-100">
                        Do not machine wash
                      </span>
                      <span className="text-xs px-3 py-1.5 rounded-full bg-muted border border-gray-100">
                        Store in cool dry place
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 sticky top-28">
                    {product.images.length > 1 && getImgUrl(product.images[Math.min(1, product.images.length - 1)].url) ? (
                      <Image
                        src={getImgUrl(product.images[Math.min(1, product.images.length - 1)].url)}
                        alt={product.images[Math.min(1, product.images.length - 1)].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover"
                        onError={() => handleImgError(product.images[Math.min(1, product.images.length - 1)].url)}
                      />
                    ) : (
                      <ImagePlaceholder className="w-full h-full" />
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="pt-6 sm:pt-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-1 h-5 rounded-full bg-accent" />
                  <h3 className="text-xl sm:text-2xl font-semibold">Technical Specifications</h3>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 mb-6">
                  {product.specifications.slice(0, 3).map((spec, i) => {
                    const specIcons = [Layers, Ruler, Weight];
                    const SpecIcon = specIcons[i] || Layers;
                    return (
                      <div key={i} className="p-4 rounded-xl bg-white border border-gray-100 text-center">
                        <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2">
                          <SpecIcon className="w-4 h-4 text-accent" />
                        </div>
                        <div className="text-xs text-muted-foreground mb-0.5">{spec.label}</div>
                        <div className="text-sm font-semibold">{spec.value}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
                  {product.specifications.map((spec, i) => {
                    const specIcons = [Layers, Ruler, Weight, Lock, Ruler, Ruler];
                    const SpecIcon = specIcons[i] || Layers;
                    return (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center justify-between py-3.5 sm:py-4 px-4 sm:px-6 transition-colors",
                          i % 2 === 0 ? "bg-white" : "bg-muted/40"
                        )}
                      >
                        <span className="flex items-center gap-3 text-sm text-muted-foreground">
                          <SpecIcon className="w-4 h-4 shrink-0" />
                          {spec.label}
                        </span>
                        <span className="text-sm font-medium text-right ml-4">{spec.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6 sm:pt-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1 h-5 rounded-full bg-accent" />
                <h3 className="text-xl sm:text-2xl font-semibold">Customer Reviews</h3>
              </div>

              {product.reviews.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold mb-1">No Reviews Yet</h4>
                  <p className="text-muted-foreground text-sm mb-4">Be the first to share your experience!</p>
                  <Button variant="outline" className="rounded-xl">
                    <Star className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-5 sm:p-6 rounded-2xl bg-white border border-gray-100">
                    <div className="flex items-center gap-5">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{product.rating}</div>
                        <div className="flex items-center gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3.5 h-3.5",
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                              )}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {product.reviews.length} review{product.reviews.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="hidden sm:flex flex-col gap-1">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = product.reviews.filter((r) => Math.floor(r.rating) === star).length;
                          const pct = (count / product.reviews.length) * 100;
                          return (
                            <div key={star} className="flex items-center gap-2 text-xs">
                              <span className="w-8 text-right text-muted-foreground">{star}</span>
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <div className="w-24 sm:w-32 h-2 rounded-full bg-muted overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-yellow-400 transition-all"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-muted-foreground w-4 text-right">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-xl shrink-0 border-2">
                      <Star className="w-4 h-4 mr-2" />
                      Write a Review
                    </Button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-3.5 h-3.5",
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" />
                            Verified
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                        <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center text-xs font-semibold text-accent">
                            {review.avatar}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{review.name}</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{review.date}</span>
                              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                              <span>Verified Purchase</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12 sm:mt-16 lg:mt-24">
            <div className="mb-8 sm:mb-10">
              <span className="text-xs font-semibold tracking-widest text-accent uppercase">Related</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">You Might Also Like</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: showMobileSticky ? 0 : 100 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:p-4 z-40 shadow-2xl shadow-black/10 lg:hidden"
      >
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{product.name}</div>
            <div className="text-lg font-bold">
              {formatPrice(discountedPrice || product.price)}
            </div>
          </div>
          <Button
            className="rounded-xl shadow-lg shadow-accent/25 shrink-0"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
