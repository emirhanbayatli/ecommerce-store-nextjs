"use client";

import { useCartContext } from "../CartContextProvider";
import { useProductsContext } from "../ProductsContextProvider";

export default function Cart() {
  const cart = useCartContext();
  const products = useProductsContext();

  const cartProducts = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product
        ? {
            ...product,
            quantity: item.quantity,
            totalPrice: product.price * item.quantity,
          }
        : null;
    })
    .filter(Boolean);

  const total = cartProducts.reduce((sum, p) => sum + p.totalPrice, 0);

  return (
    <div className="container mx-auto px-4 my-12 max-w-5xl">
      <h1 className="font-bold text-3xl mb-6 text-center">Shopping Cart</h1>

      {cartProducts.length > 0 ? (
        <div className="border rounded-xl">
          <div className="min-w-full">
            <div className="bg-white divide-y divide-gray-100">
              <ul>
                {cartProducts.map((product) => (
                  <li
                    key={product.id}
                    className="grid justify-items-center grid-cols-4 gap-4 place-items-center p-4"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      width={100}
                      className="rounded"
                    />
                    <span className="text-center">{product.title}</span>
                    <span>{product.price} $</span>
                    <span> {product.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-end p-4">
            <span className="font-bold text-lg">
              Total: {total.toFixed(2)} $
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center my-12">
          <h2 className="text-2xl my-4">Your shopping cart is empty!</h2>
        </div>
      )}
    </div>
  );
}
