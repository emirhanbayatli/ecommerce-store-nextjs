"use client";
import ItemDesc from "@/app/components/ItemDesc";
import { useProductsContext } from "../../ProductsContextProvider";
import { useProductIndexContext } from "../../ProductIndexContextProvider";
import { showStar } from "../../utils";

export default function ProductDetails() {
  const products = useProductsContext();
  const currentProduct = useProductIndexContext();

  if (currentProduct === null || currentProduct === undefined) {
    return <p className="flex justify-center text-3xl">Product not found.</p>;
  }

  return (
    <>
      <ItemDesc
        id={products[currentProduct].id}
        imgSrc={products[currentProduct].images[0]}
        imgAlt={products[currentProduct].title}
        title={products[currentProduct].title}
        price={products[currentProduct].price + " $"}
        description={products[currentProduct].description}
        rating={showStar(Number(products[currentProduct].rating))}
      />
    </>
  );
}
