"use client";
import { useContext, useState, createContext, ReactNode } from "react";
import { CartItem } from "../types/types";

export const CartContext = createContext<CartItem[]>([]);
export const CartDispatchContext = createContext<(productId: number) => void>(
  () => {},
);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addProductToCart(productId: number) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
  }

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={addProductToCart}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export const useCartDispatchContext = () => useContext(CartDispatchContext);
