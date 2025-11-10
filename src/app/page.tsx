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
                  imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqYx4NHzv4Hiwn1CImLZdA8ZAXXJbhVbBCjZ24DpBcmMnAacPVYxlrDSq3nIEl0cjsNhfvGXBJeQI-cxYgc2RYcPI7ju4BM3BR6gqjQ1AWS2e3LKV7NpqU4Iq1YLgi1W-HQMkg0ckp9Jgt0OOUcteq8zwbXbS6sLIN_NdJ__y6iG_VIWL9afRJlDncQQtQO5mdsO5hpRQkvQDnE-myaNCbBvXsBeEmH0xXZURl6YXBV15-k1qzhfvBKbsxXuZym9yTgyg_5ySeHdN"
                />
              </Link>
              <Link href={"/categories/smartphones"}>
                <CategoryCard
                  title="Next-Gen Mobile Devices"
                  imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuABEemc1xAsB_INOq-qyIfpPMYL0CPzbQj5Cokz9jvgNDCJKlFbq3lbxaF0VRl2HM9FhP6Qx62sccfuJp7n49NBC76NAgwkEcTZomRTd0Ji3OPV7PQZci4i10Y8xjHSMldYcXx5U3v1KJHhNoaTHQLHai1ZjQL5yr3ckfNmc7IxfTG_R6jfsodHTV7Pug8uSkwbcYNexZi4JSNx_9PGPlhpJX9kFlr43IhquYJMt_Y-C0rcV3Wd8MedwbgIDveDC_46FJM-T2H0lKfa"
                />
              </Link>
              <Link href={"/categories/computer-accessories"}>
                <CategoryCard
                  title="Advanced Peripherals"
                  imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBHfDHwuSL-MOtLv4DpuYlxqOMqxjElpk4ntER4O7YZsG6lDPvEQkjDxxk_LBgqP83lpMPOVxryLWxJuknW4mdksHHTJn_XcDVZOOfkbQDAoAsgh2ynOxq2rTkjhzjI8qWac1k2Tb4I3WsBmOLjc4Uunumjt1GpoVjsGVixdZzCmL_m77L-FXv7AVAGEL6h55aI-ahrtlvFp88ZZYMR3sL6nVcw2CPRRgeEg5jvFWk5H8-RQrjERjzsNBKR0-dEv23_wc62WmpASanX"
                />
              </Link>
              <Link href={"/categories/smartwatches"}>
                <CategoryCard
                  title="Connectivity & Smart Features"
                  imageUrl="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172"
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
