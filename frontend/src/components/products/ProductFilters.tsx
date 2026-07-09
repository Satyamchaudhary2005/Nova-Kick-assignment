"use client";

import React from "react";
import { X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/data/products";
import type { FilterState } from "@/types";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onClose?: () => void;
}

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
];

export default function ProductFilters({ filters, setFilters, onClose }: ProductFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: string | [number, number]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: "all",
      priceRange: [0, 6000],
      sortBy: "newest",
      search: "",
    });
  };

  const hasActiveFilters = filters.category !== "all" || filters.priceRange[0] > 0 || filters.priceRange[1] < 6000 || filters.sortBy !== "newest";

  return (
    <div className="space-y-8">
      {onClose && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {!onClose && hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="text-sm text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
        >
          <X className="w-3.5 h-3.5" />
          Clear all filters
        </button>
      )}

      <div>
        <Label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4 block">
          Sort By
        </Label>
        <div className="space-y-1">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter("sortBy", option.value)}
              className={cn(
                "w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all",
                filters.sortBy === option.value
                  ? "bg-accent/10 text-accent font-medium shadow-sm border border-accent/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4 block">
          Category
        </Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                filters.category === cat.slug
                  ? "bg-primary text-primary-foreground shadow-md shadow-black/10"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent hover:border-gray-200"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Price Range
          </Label>
          <span className="text-sm font-medium px-3 py-1 bg-accent/5 text-accent rounded-full">
            ₹{filters.priceRange[0]} — ₹{filters.priceRange[1]}
          </span>
        </div>
        <div className="px-1">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
            min={0}
            max={6000}
            step={100}
            className="mb-2"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
            <span>₹0</span>
            <span>₹6,000+</span>
          </div>
        </div>
      </div>

      <Separator />

      {onClose && (
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 rounded-xl"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button className="flex-1 rounded-xl shadow-lg shadow-accent/20" onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}
