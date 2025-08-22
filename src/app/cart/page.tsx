"use client";
import { useCartContext } from "../CartContextProvider";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { useCartDispatchContext } from "../CartContextProvider";
import Image from "next/image";
import { getProductsAction } from "../actions/admin/products";
import { useRouter } from "next/navigation";
import { discountCalculation } from "@/utils/uiUtils";
import { BuyAllButton } from "../components/BuyAllButton";

export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const cartDispatch = useCartDispatchContext();

  if (!cartDispatch) {
    throw new Error(
      "CartDispatchContext is undefined. Make sure your component is wrapped in the CartContextProvider.",
    );
  }

  const { removeProductToCart, increaseProductQuantity } = cartDispatch;
  const router = useRouter();
  useEffect(() => {
    async function getFirebaseProducts() {
      const productsForFirebase = await getProductsAction();
      setProducts(productsForFirebase);
    }
    getFirebaseProducts();
  }, []);

  const cart = useCartContext();

  const cartProducts = cart
    .map((item) => {
      const product = products.find((product) => product.id === item.id);
      return product
        ? {
            ...product,
            quantity: item.quantity,
            totalPrice: product.price * item.quantity,
          }
        : undefined;
    })
    .filter(
      (p): p is Product & { quantity: number; totalPrice: number } =>
        p !== undefined,
    );

  const totalDiscountValue = cartProducts.map((product) => {
    const discountedPrice = discountCalculation(
      product.price,
      product.discountPercentage,
    );
    const totalDiscounted = discountedPrice * product.quantity;
    return totalDiscounted;
  });

  const subTotal = cartProducts.reduce((sum, p) => sum + p.totalPrice, 0);
  const totalDiscount = totalDiscountValue.reduce((sum, val) => sum + val, 0);

  const totalPayable = subTotal - totalDiscount;

  return (
    <div className="container mx-auto px-4 my-12 max-w-5xl">
      <h1 className="font-bold text-3xl mb-6 ">Your Cart</h1>

      {cartProducts.length > 0 ? (
        <div className="bg-white rounded-xl">
          <div className="min-w-full">
            <div>
              <ul>
                {cartProducts.map((product) => (
                  <li
                    key={product.id}
                    className="grid justify-items-center grid-cols-5 gap-4 place-items-center p-4"
                  >
                    <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-center">{product.title}</span>
                    <span>
                      {product.discountPercentage !== undefined
                        ? discountCalculation(
                            product.price,
                            product.discountPercentage,
                          )
                        : product.price}
                      $
                    </span>
                    <span> {product.quantity}</span>
                    <div>
                      <button
                        className="bg-gray-200 hover:bg-gray-600 font-bold py-2 px-4 rounded mr-2 hover:text-white"
                        onClick={() => removeProductToCart(product.id)}
                      >
                        -
                      </button>
                      <button
                        className="bg-gray-200 hover:bg-gray-600 font-bold py-2 px-4 rounded hover:text-white"
                        onClick={() => increaseProductQuantity(product.id)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-end p-4 gap-3">
            <h2 className="font-bold text-lg">
              Subtotal: ${subTotal.toFixed(2)}
            </h2>
            <h2 className="font-bold text-lg">
              Discount: ${totalPayable.toFixed(2)}
            </h2>
            <h2 className="font-bold text-lg">
              Total: ${totalDiscount.toFixed(2)}
            </h2>

            <BuyAllButton
              cart={cartProducts.map((product) => ({
                stripePriceId: product.stripePriceId ?? "",
                quantity: product.quantity,
              }))}
            />
          </div>
        </div>
      ) : (
        <div className="text-center my-12">
          <h2 className="text-2xl my-4">Your shopping cart is empty!</h2>

          <Button label="Go Shopping !" onClick={() => router.push("/")} />
        </div>
      )}
    </div>
  );
}
