"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { Product } from "@/types/types";
import { discountCalculation } from "@/utils/uiUtils";

type Props = {
  products: Product[];
};

export function InstantSearchBar({ products }: Props) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filtered =
    query.length > 1
      ? products
          .filter(
            (p) =>
              p.title.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 5)
      : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for headphones, keyboards..."
          className="w-full pl-12 pr-10 py-4 text-lg bg-white border-2 border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {isFocused && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl overflow-hidden z-20">
          {filtered.length ? (
            <ul>
              {filtered.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center gap-4 p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-800">
                        {product.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        $
                        {discountCalculation(
                          product.price,
                          product.discountPercentage,
                        )}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              {query.length > 1
                ? "No products found."
                : "Start typing to see results."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
