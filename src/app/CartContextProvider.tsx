"use client";
import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { CartItem } from "../types/types";

type CartDispatch = {
  addProductToCart: (productId: number) => void;
  clearCart: () => void;
  removeProductToCart: (productId: number) => void;
};

export const CartContext = createContext<CartItem[]>([]);
export const CartDispatchContext = createContext<CartDispatch | undefined>(
  undefined,
);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

      return updatedCart;
    });
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }
  function removeProductToCart(productId: number) {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    });
  }

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider
        value={{
          addProductToCart,
          removeProductToCart,
          clearCart,
        }}
      >
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export const useCartDispatchContext = () => useContext(CartDispatchContext);
