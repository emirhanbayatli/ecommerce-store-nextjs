import Link from "next/link";
import { getProductsAction } from "./actions/admin/products";
import ProductCard from "./components/ProductCard";
import { CategoryCard } from "./components/CategoryCard";
import { HeroWithSearch } from "./components/HeroWithSearch";
import FeaturedArea from "./components/FeaturedArea";

export default async function Home() {
  try {
    const products = await getProductsAction();

    const exploreProducts = products.filter((product) =>
      product.status?.includes("Explore"),
    );

    return (
      <main className="p-4 md:p-12">
        <HeroWithSearch products={products} />
        <div className="mx-auto px-4 grid lg:grid-cols-4 gap-4 sm:grid-cols-1">
          <section className="my-8 col-span-3">
            <h1 className="font-bold text-3xl mb-6">Explore Products</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exploreProducts.slice(0, 9).map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <ProductCard
                    key={product.id}
                    imageUrl={product.images[0]}
                    altText={product.title}
                    title={product.title}
                    description={product.description}
                    discount={product.discountPercentage}
                    price={`${product.price}`}
                  />
                </Link>
              ))}
            </div>
          </section>

          <section className="my-8 col-span-1">
            <h1 className="font-bold text-3xl mb-6 sm:text-left">
              Explore Categories
            </h1>
            <div className="flex lg:flex-col gap-6 sm:flex-row flex-wrap">
              <Link href={"/categories/laptops"}>
                <CategoryCard
                  title="High-Performance Computing"
                  imageUrl="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80"
                />
              </Link>

              <Link href={"/categories/smartphones"}>
                <CategoryCard
                  title="Next-Gen Mobile Devices"
                  imageUrl="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80"
                />
              </Link>

              <Link href={"/categories/computer-accessories"}>
                <CategoryCard
                  title="Advanced Peripherals"
                  imageUrl="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80"
                />
              </Link>

              <Link href={"/categories/smartwatches"}>
                <CategoryCard
                  title="Connectivity & Smart Features"
                  imageUrl="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1200&q=80"
                />
              </Link>
            </div>
          </section>
        </div>
        <h1 className="font-bold text-3xl my-8">Featured Products</h1>
        <FeaturedArea />
      </main>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="flex justify-center items-center min-h-screen flex-col gap-4">
        <h1 className="text-3xl text-gray-600 text-center ">
          Something went wrong!
        </h1>
        <Link className="text-3xl text-gray-600 text-center " href={"/"}>
          Try Again
        </Link>
      </div>
    );
  }
}
