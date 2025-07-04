"use client";
import { useParams } from "next/navigation";
import ItemDesc from "@/app/components/ItemDesc";
import { showStar } from "../../../utils/uiUtils";
import { useState, useEffect } from "react";
import { Product } from "@/types/types";

export default function ProductDetails() {
  const params = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [params.productId]);

  if (!product) {
    return (
      <h1 className="text-3xl text-center text-gray-60 h-screen">
        Loading product...
      </h1>
    );
  }
  return (
    <main>
      <div className="flex flex-wrap justify-center gap-4 p-6">
        <ItemDesc
          id={product.id}
          imgSrc={product.images[0]}
          imgAlt={product.title}
          title={product.title}
          price={product.price + " $"}
          description={product.description}
          rating={showStar(Number(product.rating))}
        />
      </div>
    </main>
  );
}
