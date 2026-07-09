"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import type { CartItem, Product, ShippingInfo } from "@/types";
import { calculateDiscount } from "@/lib/utils";

interface CartState {
  items: CartItem[];
  coupon: string | null;
  discount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number; selectedSize: string; selectedColor: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; size: string; color: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: "APPLY_COUPON"; payload: string }
  | { type: "REMOVE_COUPON" }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getShipping: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, selectedSize, selectedColor } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product._id === product._id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
        return { ...state, items: newItems };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity, selectedSize, selectedColor }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(item.product._id === action.payload.productId &&
              item.selectedSize === action.payload.size &&
              item.selectedColor === action.payload.color)
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product._id === action.payload.productId &&
          item.selectedSize === action.payload.size &&
          item.selectedColor === action.payload.color
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "APPLY_COUPON":
      return { ...state, coupon: action.payload, discount: action.payload === "NOVA20" ? 20 : 0 };
    case "REMOVE_COUPON":
      return { ...state, coupon: null, discount: 0 };
    case "CLEAR_CART":
      return { ...state, items: [], coupon: null, discount: 0 };
    case "LOAD_CART":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    coupon: null,
    discount: 0,
  });

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("novakicks-cart");
      if (savedCart) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
      }
    } catch { }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("novakicks-cart", JSON.stringify(state.items));
    } catch { }
  }, [state.items]);

  const addItem = useCallback(
    (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
      const size = selectedSize || product.sizes[0]?.size || "M";
      const color = selectedColor || product.colors[0]?.name || "Default";
      dispatch({ type: "ADD_ITEM", payload: { product, quantity, selectedSize: size, selectedColor: color } });
    },
    []
  );

  const removeItem = useCallback((productId: string, size: string, color: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, size, color } });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      if (quantity < 1) return;
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, size, color, quantity } });
    },
    []
  );

  const applyCoupon = useCallback((code: string) => {
    dispatch({ type: "APPLY_COUPON", payload: code });
  }, []);

  const removeCoupon = useCallback(() => {
    dispatch({ type: "REMOVE_COUPON" });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const getSubtotal = useCallback(() => {
    return state.items.reduce((total, item) => {
      const discountedPrice = item.product.discount
        ? calculateDiscount(item.product.price, item.product.discount)
        : item.product.price;
      return total + discountedPrice * item.quantity;
    }, 0);
  }, [state.items]);

  const getShipping = useCallback(() => {
    const subtotal = getSubtotal();
    return subtotal >= 150 ? 0 : 12.99;
  }, [getSubtotal]);

  const getTax = useCallback(() => {
    return getSubtotal() * 0.08;
  }, [getSubtotal]);

  const getTotal = useCallback(() => {
    const subtotal = getSubtotal();
    const discountAmount = subtotal * (state.discount / 100);
    return subtotal - discountAmount + getShipping() + getTax();
  }, [getSubtotal, getShipping, getTax, state.discount]);

  const getItemCount = useCallback(() => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  }, [state.items]);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
        getSubtotal,
        getShipping,
        getTax,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
