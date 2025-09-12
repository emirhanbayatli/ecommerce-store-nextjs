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
  addProductToCart: (productId: string, stripePriceId: string) => void;
  clearCart: () => void;
  removeProductToCart: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
};

export const CartContext = createContext<CartItem[]>([]);
export const CartDispatchContext = createContext<CartDispatch | undefined>(
  undefined,
);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addProductToCart(productId: string, stripePriceId: string) {
    try {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === productId);
        let updatedCart: CartItem[];
        if (existingItem) {
          updatedCart = prevCart.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          );
        } else {
          updatedCart = [
            ...prevCart,
            { id: productId, stripePriceId, quantity: 1 },
          ];
        }
        setMessage("Product added to cart successfully.");
        return updatedCart;
      });
    } catch (err) {
      console.error("err", err);
      setErrorMessage(
        "An error occurred. The product could not be added to the cart.",
      );
    }
  }

  function clearCart() {
    try {
      setCart([]);
      localStorage.removeItem("cart");
      setMessage("Cart cleared successfully.");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to clear the cart.");
    }
  }
  function removeProductToCart(productId: string) {
    try {
      setCart((prevCart) => {
        return prevCart
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0);
      });
      setMessage("Product removed from cart.");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to remove product.");
    }
  }
  function increaseProductQuantity(productId: string) {
    try {
      setCart((prevCart) => {
        return prevCart
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
          .filter((item) => item.quantity > 0);
      });
      setMessage("Product quantity increased.");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to increase product quantity.");
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider
        value={{
          addProductToCart,
          removeProductToCart,
          increaseProductQuantity,
          clearCart,
        }}
      >
        {message && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <p className="text-sm font-medium px-6 py-3 bg-green-300 rounded-lg shadow-lg">
              {message}
            </p>
          </div>
        )}
        {errorMessage && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <p className="text-sm font-medium px-6 py-3 bg-red-400 rounded-lg shadow-lg">
              {errorMessage}
            </p>
          </div>
        )}

        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export const useCartDispatchContext = () => useContext(CartDispatchContext);
