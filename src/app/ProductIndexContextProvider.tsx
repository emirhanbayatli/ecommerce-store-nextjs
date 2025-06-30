"use client";

import { useContext, useState, createContext, ReactNode } from "react";

export const ProductIndexContext = createContext<number | null>(null);
export const ProductIndexDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<number | null>>
>(() => {});

interface ProductIndexContextProviderProps {
  children: ReactNode;
}

export const ProductIndexContextProvider = ({
  children,
}: ProductIndexContextProviderProps) => {
  const [productIndex, setProductIndex] = useState<number | null>(null);
  return (
    <ProductIndexContext.Provider value={productIndex}>
      <ProductIndexDispatchContext.Provider value={setProductIndex}>
        {children}
      </ProductIndexDispatchContext.Provider>
    </ProductIndexContext.Provider>
  );
};

export const useProductIndexContext = () => useContext(ProductIndexContext);
export const useProductIndexDispatchContext = () =>
  useContext(ProductIndexDispatchContext);
