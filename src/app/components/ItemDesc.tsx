import { ItemDescProps } from "../types";
import { Button } from "../components/Button";
import { useProductIndexContext } from "../ProductIndexContextProvider";
import { useCartDispatchContext } from "../CartContextProvider";

export default function ItemDesc({
  id,
  title,
  imgSrc,
  imgAlt,
  price,
  rating,
  description,
}: ItemDescProps) {
  const productID = useProductIndexContext();
  const addProductToCart = useCartDispatchContext();

  console.log(productID, "productID");

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="rounded shadow-lg bg-white m-4 flex max-w-4xl ">
          <img src={imgSrc} alt={imgAlt} className="max-w-xl" />
          <div className="px-6 py-4 flex flex-col  justify-center">
            <h3 className="text-gray-700 font-bold text-xl mb-2 ">{title}</h3>
            <p className="text-gray-700 text-xl  ">{"Rating Value" + rating}</p>
            <p className="text-gray-700 text-xl ">{description}</p>
            <p className="text-gray-700 font-bold text-xl ">{price}</p>
            <Button
              label="Add To Cart"
              className="my-4"
              onClick={() => {
                addProductToCart(id);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
