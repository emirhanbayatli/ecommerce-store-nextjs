import Link from "next/link";
import { Product } from "../../types/types";
import ItemCard from "../components/ItemCard";
import { discountCalculation, showStar } from "../../utils/uiUtils";
import { getProductsAction } from "../actions/admin/products";
import { ProductCard } from "../components/ProductCard";

export default async function Products() {
  try {
    const products = await getProductsAction();

    return (
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-6 min-h-screen">
        {products.map((product: Product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard
              title={product.title}
              imageUrl={product.images[0]}
              altText={product.title}
              price={`$${product.price}`}
              description={product.description}
            />
          </Link>
        ))}
      </main>
    );
  } catch (error) {
    console.log(error);
    return (
      <div>
        <h1 className="text-3xl text-gray-600 text-center min-h-screen flex items-center justify-center">
          Something went wrong!
        </h1>
      </div>
    );
  }
}
