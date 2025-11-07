import { discountCalculation } from "@/utils/uiUtils";
import { getProductsAction } from "../actions/admin/products";
import { FeaturedProductCard } from "./FeaturedProductCard";
import { ProductCard } from "./ProductCard";

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
              <FeaturedProductCard
                key={product.id}
                imageUrl={product.images[0]}
                imageAlt={product.title}
                title={product.title}
                description={product.description}
                price={`$${discountCalculation(
                  product.price,
                  product.discountPercentage,
                )}`}
                originalPrice={`$${product.price}`}
                buttonText="Add to Cart"
                imagePosition="right"
                category={product.category}
              />
            );
          }

          return (
            <ProductCard
              key={product.id}
              imageUrl={product.images[0]}
              altText={product.title}
              title={product.title}
              description={product.description}
              price={product.price.toString()}
            />
          );
        })}

        {featuredProducts.slice(3, 6).map((product, index) => {
          if (index === 0) {
            return (
              <FeaturedProductCard
                key={product.id}
                imageUrl={product.images[0]}
                imageAlt={product.title}
                title={product.title}
                description={product.description}
                price={`$${discountCalculation(
                  product.price,
                  product.discountPercentage,
                )}`}
                originalPrice={`$${product.price}`}
                buttonText="Add to Cart"
                imagePosition="left"
                category={product.category}
              />
            );
          }

          return (
            <ProductCard
              key={product.id}
              imageUrl={product.images[0]}
              altText={product.title}
              title={product.title}
              description={product.description}
              price={product.price.toString()}
            />
          );
        })}
      </div>
    </main>
  );
}
