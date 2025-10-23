"use client";
import { Button } from "../components/Button";
import { useCartDispatchContext } from "../CartContextProvider";
import Carousel from "./Carousel";
import {
  CURRENCY,
  CURRENCY_SYMBOL,
  discountCalculation,
} from "@/utils/uiUtils";

export interface ItemDescProps {
  id: string;
  title: string;
  imgSrc: string[];
  imgAlt: string;
  price: number;
  rating: string;
  description: string;
  stripePriceId: string;
  discount?: number;
}

export default function ItemDesc({
  id,
  title,
  imgSrc,
  stripePriceId,
  price,
  rating,
  description,
  discount,
}: ItemDescProps) {
  const cartDispatch = useCartDispatchContext();
  if (!cartDispatch)
    throw new Error(
      "CartDispatchContext is undefined. Make sure your component is wrapped in the CartContextProvider.",
    );

  const { addProductToCart } = cartDispatch;

  return (
    <div className="flex items-center justify-center py-8">
      <div className="rounded-lg shadow-xl bg-white m-4 flex max-w-5xl flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2">
          <Carousel images={imgSrc} />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col space-y-4">
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full self-start">
            In Stock
          </span>
          <h1 className="text-gray-900 font-bold text-3xl">{title}</h1>
          <div className="flex text-yellow-500">
            <p className="text-lg">{rating}</p>
          </div>

          <p className="text-gray-600 text-base leading-relaxed">
            {description}
          </p>
          <div className="flex items-baseline space-x-3 pt-4">
            {discount && discount > 0 ? (
              <>
                <p className="text-gray-800 font-bold text-3xl">
                  {discountCalculation(price, discount) + CURRENCY_SYMBOL}
                </p>
                <p className="text-gray-400 font-light text-xl line-through">
                  {price + CURRENCY_SYMBOL}
                </p>
              </>
            ) : (
              <p className="text-gray-800 font-bold text-3xl">
                {price + CURRENCY_SYMBOL}
              </p>
            )}
          </div>
          <Button
            label="Add To Cart"
            className="my-4"
            onClick={() => addProductToCart(id.toString(), stripePriceId)}
          />
        </div>
      </div>
    </div>
  );
}
