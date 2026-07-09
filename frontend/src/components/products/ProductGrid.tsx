"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, Grid3X3, List, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import type { FilterState } from "@/types";
import { cn } from "@/lib/utils";

export default function ProductGrid() {
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: [0, 6000],
    sortBy: "newest",
    search: "",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const productsPerPage = 12;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (filters.category !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const hasActiveFilters = filters.category !== "all" || filters.priceRange[0] > 0 || filters.priceRange[1] < 6000 || filters.search;

  const clearCategoryFilter = () => setFilters((prev) => ({ ...prev, category: "all" }));
  const clearPriceFilter = () => setFilters((prev) => ({ ...prev, priceRange: [0, 6000] }));
  const clearSearch = () => setFilters((prev) => ({ ...prev, search: "" }));

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex-1 max-w-lg">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <Input
              type="text"
              placeholder="Search sneakers..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="pl-12 h-12 rounded-2xl bg-white border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
            />
            {filters.search && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-primary hover:bg-muted/50"
              )}
              title="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-primary hover:bg-muted/50"
              )}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger
                render={
                  <Button variant="outline" className="rounded-xl gap-2 border-gray-200 shadow-sm">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </Button>
                }
              />
              <SheetContent side="left" className="w-[85vw] sm:w-[380px] overflow-y-auto p-6">
                <ProductFilters
                  filters={filters}
                  setFilters={setFilters}
                  onClose={() => setSheetOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>

          <span className="text-sm text-muted-foreground whitespace-nowrap font-medium bg-muted/50 px-3 py-1.5 rounded-lg">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-medium text-muted-foreground mr-1">Active:</span>
          {filters.search && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/5 text-accent rounded-full text-xs font-medium border border-accent/10">
              &ldquo;{filters.search}&rdquo;
              <button onClick={clearSearch}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.category !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/5 text-accent rounded-full text-xs font-medium border border-accent/10">
              {filters.category}
              <button onClick={clearCategoryFilter}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 6000) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/5 text-accent rounded-full text-xs font-medium border border-accent/10">
              ₹{filters.priceRange[0]} — ₹{filters.priceRange[1]}
              <button onClick={clearPriceFilter}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      <div className="flex gap-8">
        <aside className="hidden lg:block w-[270px] flex-shrink-0">
          <div className="sticky top-28">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <ProductFilters filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {paginatedProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-2xl border border-gray-100"
              >
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No products found</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
                  Try adjusting your search or filter criteria to find what you&apos;re looking for.
                </p>
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() =>
                    setFilters({
                      category: "all",
                      priceRange: [0, 6000],
                      sortBy: "newest",
                      search: "",
                    })
                  }
                >
                  Reset Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
                    : "space-y-4"
                )}
              >
                {paginatedProducts.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-sm hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white"
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "w-10 h-10 rounded-xl text-sm font-medium transition-all",
                    currentPage === i + 1
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                      : "bg-white border border-gray-200 text-muted-foreground hover:border-primary hover:text-primary"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-sm hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white"
              >
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
