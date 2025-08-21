"use client";

import { checkout } from "@/app/actions/cart/checkout";
import { useCartContext } from "../CartContextProvider";
import { getProductsAction } from "../actions/admin/products";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";

export const BuyAllButton = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const cart = useCartContext();

  useEffect(() => {
    async function getAction() {
      const data = await getProductsAction();
      setProducts(data);
    }
    getAction();
  }, []);

  const moreInfoProduct = [];

  cart.map((cartItem) => {
    products.map((product) => {
      if (cartItem.id == product.id) {
        moreInfoProduct.push({ ...product, ...cartItem });
      }
    });
  });

  return (
    <form action={checkout}>
      <input type="hidden" name="productInfo" value={moreInfoProduct} />

      <button
        type="submit"
        className="text-[#49739c] text-sm font-normal leading-normal"
      >
        Buy All
      </button>
    </form>
  );
};
