import { getProductsAction } from "@/app/actions/admin/products";
import { ProductCard } from "@/app/components/ProductCard";
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
    <div className="grid grid-cols-4 gap-3 p-5 min-h-screen">
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
                price={`$${product.price}`}
                description={product.description}
              />
            </Link>
          );
        }
        return null;
      })}
    </div>
  );
}
