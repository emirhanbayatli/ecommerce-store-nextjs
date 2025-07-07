import Link from "next/link";
import { Product } from "./../types/types";
import ItemCard from "./components/ItemCard";
import { showStar } from "../utils/uiUtils";

export default async function Home() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    return (
      <main className="px-24">
        {/* <div className="relative w-full ">
          <img
            src="https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="örnek"
            className="w-full rounded-lg shadow"
          />

          <button className="absolute bottom-4 right-4 bg-black  text-white px-4 py-2 rounded  ">
            Shop Now!
          </button>
        </div> */}

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
