import { getProductsAction } from "@/app/actions/admin/products";
import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/types/types";

import Link from "next/link";

export default async function Categories({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const products = await getProductsAction();

  console.log(category, "category");

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-6 min-h-screen">
      {products.map((product: Product) => {
        if (
          category.toLocaleLowerCase() === product.category.toLocaleLowerCase()
        ) {
          return (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard
                title={product.title}
                imageUrl={product.images[0]}
                altText={product.title}
                price={`${product.price}`}
                discount={product.discountPercentage}
                description={product.description}
              />
            </Link>
          );
        }
        return null;
      })}
    </main>
  );
}
