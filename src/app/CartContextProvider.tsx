"use client";
import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { CartItem } from "../types/types";
import { toast } from "sonner";

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
        return updatedCart;
      });

      toast.success("Product added to cart successfully.");
    } catch (err) {
      console.error("err", err);

      toast.error(
        "An error occurred. The product could not be added to the cart.",
      );
    }
  }

  function clearCart() {
    try {
      setCart([]);
      localStorage.removeItem("cart");
      toast.success("Cart cleared successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear the cart.");
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
      toast.success("Product removed from cart.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove product.");
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
      toast.success("Product quantity increased.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to increase product quantity.");
    }
  }

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
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export const useCartDispatchContext = () => useContext(CartDispatchContext);
