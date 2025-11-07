"use client";
import { CURRENCY_SYMBOL, discountCalculation } from "@/utils/uiUtils";

interface FeaturedProductCardProps {
  category: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  imagePosition: "left" | "right";
}

export default function FeaturedProductCard({
  category,
  title,
  description,
  price,
  discount,
  imageUrl,
  imageAlt,
  imagePosition,
}: FeaturedProductCardProps) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-[#1a2a3a] rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <img
        alt={imageAlt}
        className={`w-full md:w-1/2 h-80 md:h-auto object-cover ${
          imagePosition === "right" ? "md:order-2" : ""
        }`}
        src={imageUrl}
      />
      <div
        className={`p-8 flex flex-col justify-center ${
          imagePosition === "right" ? "md:order-1" : ""
        }`}
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm uppercase font-semibold mb-2">
          {category}
        </p>
        <h2 className="text-3xl font-bold text-[#111418] dark:text-white mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-6">
          {description}
        </p>
        <div className="flex items-center mb-6">
          {discount && discount > 0 ? (
            <>
              <p className="text-gray-800 dark:text-white font-bold text-3xl mr-3">
                {CURRENCY_SYMBOL + discountCalculation(Number(price), discount)}
              </p>
              <p className="text-gray-400 font-light text-xl line-through">
                {CURRENCY_SYMBOL + price}
              </p>
            </>
          ) : (
            <p className="text-gray-800  dark:text-white font-bold text-3xl">
              {CURRENCY_SYMBOL + price}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
