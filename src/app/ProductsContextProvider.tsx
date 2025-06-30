"use client";
import {
  useEffect,
  useContext,
  useState,
  createContext,
  ReactNode,
} from "react";

export const ProductsContext = createContext<any[]>([]);
export const ProductsDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<any[]>>
>(() => {});

interface ProductsContextProviderProps {
  children: ReactNode;
}

export async function getProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    return data.products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const ProductsContextProvider = ({
  children,
}: ProductsContextProviderProps) => {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  return (
    <ProductsContext.Provider value={products}>
      <ProductsDispatchContext.Provider value={setProducts}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
export const useProductsDispatchContext = () =>
  useContext(ProductsDispatchContext);
