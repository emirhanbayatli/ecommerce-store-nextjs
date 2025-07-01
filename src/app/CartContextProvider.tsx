"use client";
import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { CartItem } from "../types/types";

export const CartContext = createContext<CartItem[]>([]);
export const CartDispatchContext = createContext<(productId: number) => void>(
  () => {},
);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  function addProductToCart(productId: number) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);

      let updatedCart: CartItem[];
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedCart = [...prevCart, { id: productId, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  function clearToCart() {
    setCart([]);
    localStorage.clear();
  }
  function removeProductToCart(productId: number) {
    setCart([]);
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
