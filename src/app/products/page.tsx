import Link from "next/link";
import { Product } from "../../types/types";
import ItemCard from "../components/ItemCard";
import { discountCalculation, showStar } from "../../utils/uiUtils";
import { getProductsAction } from "../actions/admin/products";

export default async function Products() {
  try {
    const products = await getProductsAction();

    return (
      <main className="grid grid-cols-4 gap-6 p-6">
        {products.map((product: Product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ItemCard
              key={product.id}
              id={product.id}
              title={product.title}
              imgSrc={product.images[0]}
              imgAlt={product.title}
              price={`$${product.price}`}
              discount={
                product?.discountPercentage && product.discountPercentage > 0
                  ? discountCalculation(
                      product.price,
                      product.discountPercentage,
                    )
                  : product?.price
              }
              rating={showStar(product.rating ?? 0)}
            />
          </Link>
        ))}
      </main>
    );
  } catch (error) {
    console.log(error);
    return (
      <h1 className="text-3xl text-red-600 text-center">
        Something went wrong!
      </h1>
    );
  }
}
