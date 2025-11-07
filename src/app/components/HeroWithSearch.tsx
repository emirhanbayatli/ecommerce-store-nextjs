import { InstantSearchBar } from "./InstantSearchBar";
import { Product } from "@/types/types";

type HeroWithSearchProps = {
  products: Product[];
};

export function HeroWithSearch({ products }: HeroWithSearchProps) {
  return (
    <div className="bg-white dark:bg-[#1a2a3a] relative w-full py-24 md:py-32 flex flex-col items-center justify-center text-center  rounded-xl my-3">
      <div className="relative z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white ">
          Find Your Next Gear
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-900 dark:text-gray-300">
          The best tech products, right at your fingertips.
        </p>
        <div className="mt-8">
          <InstantSearchBar products={products} />
        </div>
      </div>
    </div>
  );
}
