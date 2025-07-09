import Link from "next/link";
import { Product } from "./../types/types";
import ItemCard from "./components/ItemCard";
import { Button } from "./components/Button";
import { showStar } from "../utils/uiUtils";

export default async function Home() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    return (
      <main className="px-24">
        <div className="relative w-full my-3">
          <img
            src="/banner.png"
            alt="örnek"
            className="w-full h-100 object-fill"
          />
          <button className="absolute bottom-4 right-4 bg-black  text-white px-4 py-2 rounded  ">
            Shop Now!
          </button>
        </div>

        <h1 className="text-center font-bold text-3xl my-8">Categories</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center bg-white rounded-xl shadow hover:shadow-lg transition">
            <img
              src="/Groceries.jpg"
              alt="Groceries"
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <p className="py-4 font-semibold">Groceries</p>
          </div>

          <div className="flex flex-col items-center text-center bg-white rounded-xl shadow hover:shadow-lg transition">
            <img
              src="/Beauty.jpg"
              alt="Beauty"
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <p className="py-4 font-semibold">Beauty</p>
          </div>

          <div className="flex flex-col items-center text-center bg-white rounded-xl shadow hover:shadow-lg transition">
            <img
              src="/Fragrances.jpg"
              alt="Fragrances"
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <p className="py-4 font-semibold">Fragrances</p>
          </div>

          <div className="flex flex-col items-center text-center bg-white rounded-xl shadow hover:shadow-lg transition">
            <img
              src="/Furniture.jpg"
              alt="Furniture"
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <p className="py-4 font-semibold">Furniture</p>
          </div>
        </div>
        <h1 className="text-center font-bold text-3xl my-8">
          Featured Products
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
          {data.products.map((product: Product) =>
            product.rating >= 4.7 ? (
              <Link key={product.id} href={`/products/${product.id}`}>
                <ItemCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  imgSrc={product.images[0]}
                  imgAlt={product.title}
                  price={`$${product.price}`}
                  rating={showStar(product.rating)}
                />
              </Link>
            ) : null,
          )}
        </div>
        <div className="flex justify-between mx-4 my-5">
          <div className="flex items-center gap-2 bg-gray-200 p-4 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <p className="text-2xl font-semibold">Free shipping</p>
          </div>
          <div className="flex items-center gap-2  bg-gray-200 p-4 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            <p className="text-2xl font-semibold">Easy Returns</p>
          </div>
          <div className="flex items-center gap-2  bg-gray-200 p-4 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="text-2xl font-semibold">Secure Payment</p>
          </div>
          <div className="flex items-center gap-2  bg-gray-200 p-4 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <p className="text-2xl font-semibold">24/7 live support</p>
          </div>
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
