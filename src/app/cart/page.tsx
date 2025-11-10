"use client";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { useCartContext, useCartDispatchContext } from "../CartContextProvider";
import Image from "next/image";
import { getProductsAction } from "../actions/admin/products";
import { useRouter } from "next/navigation";
import { CURRENCY_SYMBOL, discountCalculation } from "@/utils/uiUtils";
import { BuyAllButton } from "../components/BuyAllButton";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cart = useCartContext();
  const cartDispatch = useCartDispatchContext();
  const router = useRouter();

  if (!cartDispatch) {
    throw new Error(
      "CartDispatchContext is undefined. Make sure your component is wrapped in the CartContextProvider.",
    );
  }

  const { removeProductToCart, increaseProductQuantity, clearCart } =
    cartDispatch;

  useEffect(() => {
    async function getFirebaseProducts() {
      setLoading(true);
      try {
        const productsForFirebase = await getProductsAction();
        setProducts(productsForFirebase);
      } catch (err) {
        console.error(
          "An error occurred while loading products from Firebase",
          err,
        );
        setError(
          "Unable to load products. Please refresh the page or try again later.",
        );
      } finally {
        setLoading(false);
      }
    }

    getFirebaseProducts();
  }, []);

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

  const subTotal = cartProducts.reduce((sum, p) => sum + p.totalPrice, 0);

  const totalPayable = cartProducts.reduce((sum, product) => {
    const discountedPrice = discountCalculation(
      product.price,
      product.discountPercentage,
    );
    return sum + discountedPrice * product.quantity;
  }, 0);

  const totalDiscount = subTotal - totalPayable;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center my-12 text-red-500">{error}</div>;
  }
  if (cartProducts.length === 0) {
    return (
      <div className="text-center my-20 min-h-screen flex flex-col  items-center">
        <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-300" />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Your cart is currently empty
        </h2>
        <p className="mt-2 text-gray-500">
          Discover our amazing products to get started.
        </p>
        <div className="mt-6">
          <Button label="Start Shopping" onClick={() => router.push("/")} />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          My Cart ({cart.length})
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md">
              <ul className="divide-y divide-gray-200">
                {cartProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex flex-col sm:flex-row items-center p-4 gap-4"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover w-24 h-24"
                      />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="font-semibold text-gray-800">
                        {product.title}
                      </h3>
                      <button
                        onClick={() => removeProductToCart(product.id)}
                        className="sm:hidden mt-2 text-xs font-semibold text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center gap-4 my-2 sm:my-0">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => removeProductToCart(product.id)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold text-center">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => increaseProductQuantity(product.id)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right w-24">
                        <p className="font-bold text-lg text-gray-800">
                          {CURRENCY_SYMBOL}
                          {discountCalculation(
                            product.price,
                            product.discountPercentage,
                          ).toFixed(2)}
                        </p>
                        {product.discountPercentage > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            {CURRENCY_SYMBOL}
                            {product.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => removeProductToCart(product.id)}
                      className="hidden sm:block text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="p-4 text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-sm font-medium text-gray-500 hover:text-red-600">
                      Clear Cart
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        remove all items from your shopping cart.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={clearCart}>
                        Yes, Clear Cart
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4  pb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                {totalDiscount > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        {CURRENCY_SYMBOL}
                        {subTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium">
                        -{CURRENCY_SYMBOL}
                        {totalDiscount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t mt-4">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">
                    {CURRENCY_SYMBOL}
                    {totalPayable.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <BuyAllButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
