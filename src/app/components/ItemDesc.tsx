"use client";
import { Button } from "../components/Button";
import { useCartDispatchContext } from "../CartContextProvider";
import Carousel from "./Carousel";

export interface ItemDescProps {
  id: number;
  title: string;
  imgSrc: string[];
  price: string;
  rating: string;
  description: string;
}

export default function ItemDesc({
  id,
  title,
  imgSrc,

  price,
  rating,
  description,
}: ItemDescProps) {
  const cartDispatch = useCartDispatchContext();

  if (!cartDispatch) {
    throw new Error(
      "CartDispatchContext is undefined. Make sure your component is wrapped in the CartContextProvider.",
    );
  }

  const { addProductToCart } = cartDispatch;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="rounded shadow-lg bg-white m-4 flex max-w-4xl ">
          <Carousel images={imgSrc} />
          <div className="px-6 py-4 flex flex-col gap-3 justify-center">
            <h3 className="text-gray-700 font-bold text-xl mb-2 ">{title}</h3>
            <p className="text-gray-700 text-lg  ">{rating}</p>
            <p className="text-gray-700 text-sm ">{description}</p>
            <p className="text-gray-700 font-bold text-xl ">{price}</p>

            <Button
              label="Add To Cart"
              className="my-4"
              onClick={() => {
                addProductToCart(Number(id));
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
