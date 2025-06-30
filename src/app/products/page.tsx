"use client";
import Link from "next/link";
import { Product } from "../../types/types";
import ItemCard from "../components/ItemCard";
import { useProductsContext } from "../ProductsContextProvider";
import { useProductIndexDispatchContext } from "../ProductIndexContextProvider";
import { showStar } from "../utils";

export default function Products() {
  const products = useProductsContext();
  const dispatchProductIndex = useProductIndexDispatchContext();
  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product: Product) =>
        product.images.map((productImage: string, idx: number) => (
          <Link
            key={`${product.id}-${idx}`}
            href={`/products/${product.id}`}
            onClick={() => dispatchProductIndex(product.id - 1)}
          >
            <ItemCard
              id={product.id}
              imgSrc={productImage}
              imgAlt={product.title}
              title={product.title}
              price={product.price + " $"}
              rating={product.rating + showStar(Number(product.rating))}
            />
          </Link>
        )),
      )}
    </div>
  );
}
