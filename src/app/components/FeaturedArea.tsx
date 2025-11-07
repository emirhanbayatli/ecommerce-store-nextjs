import Link from "next/link";
import { getProductsAction } from "../actions/admin/products";
import FeaturedProductCard from "./FeaturedProductCard";
import ProductCard from "./ProductCard";

export default async function FeaturedArea() {
  const products = await getProductsAction();
  const featuredProducts = products.filter((product) =>
    product.status?.includes("Featured"),
  );
  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {featuredProducts.slice(0, 3).map((product, index) => {
          if (index === 2) {
            return (
              <Link
                key={product.id}
                className="contents"
                href={`/products/${product.id}`}
              >
                <FeaturedProductCard
                  imageUrl={product.images[0]}
                  imageAlt={product.title}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  discount={product.discountPercentage}
                  buttonText="Add to Cart"
                  imagePosition="left"
                  category={product.category}
                />
              </Link>
            );
          }

          return (
            <Link
              key={product.id}
              className="contents"
              href={`/products/${product.id}`}
            >
              <ProductCard
                imageUrl={product.images[0]}
                altText={product.title}
                title={product.title}
                description={product.description}
                price={product.price.toString()}
                discount={product.discountPercentage}
              />
            </Link>
          );
        })}

        {featuredProducts.slice(3, 6).map((product, index) => {
          if (index === 0) {
            return (
              <Link
                key={product.id}
                className="contents"
                href={`/products/${product.id}`}
              >
                <FeaturedProductCard
                  imageUrl={product.images[0]}
                  imageAlt={product.title}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  discount={product.discountPercentage}
                  buttonText="Add to Cart"
                  imagePosition="left"
                  category={product.category}
                />
              </Link>
            );
          }

          return (
            <Link
              key={product.id}
              className="contents"
              href={`/products/${product.id}`}
            >
              <ProductCard
                imageUrl={product.images[0]}
                altText={product.title}
                title={product.title}
                description={product.description}
                price={product.price.toString()}
                discount={product.discountPercentage}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
