"use client";
import { CURRENCY_SYMBOL, discountCalculation } from "@/utils/uiUtils";
interface ProductCardProps {
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
  price: string;
  discount?: number;
}
export default function ProductCard({
  imageUrl,
  altText,
  title,
  description,
  price,
  discount,
}: ProductCardProps) {
  return (
    <div className="bg-white  rounded-xl shadow-lg overflow-hidden">
      <img
        alt={altText}
        className="w-full h-56 object-contain"
        src={imageUrl}
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-[#111418] mb-2 line-clamp-1 ">
          {title}
        </h3>
        <p className="text-gray-700  text-base mb-3 line-clamp-3">
          {description}
        </p>
        <div className="text-center my-2 h-16">
          {discount && discount > 0 ? (
            <>
              <p className="text-gray-800  font-bold text-3xl">
                {CURRENCY_SYMBOL + discountCalculation(Number(price), discount)}
              </p>
              <p className="text-gray-400  font-light text-xl line-through">
                {CURRENCY_SYMBOL + price}
              </p>
            </>
          ) : (
            <p className="text-gray-800   font-bold text-3xl">
              {CURRENCY_SYMBOL + price}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
