import Link from "next/link";
import { Product } from "./../types/types";
import ItemCard from "./components/ItemCard";
import { showStar } from "../utils/utils";

export default async function Home() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    return (
      <main>
        <div className="flex flex-wrap justify-center gap-4 p-6">
          {data.products.map((product: Product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ItemCard
                key={product.id}
                id={product.id}
                imgSrc={product.images[0]}
                imgAlt={product.title}
                title={product.title}
                price={product.price + " $"}
                rating={`${product.rating} ${showStar(Number(product.rating))}`}
              />
            </Link>
          ))}
        </div>
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
