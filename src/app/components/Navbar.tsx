"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "../CartContextProvider";

export default function Navbar() {
  const cart = useCartContext();

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  console.log(totalCount + "totalCount");

  return (
    <nav className="bg-gray-100 shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-700 hover:text-gray-500"
        >
          E-Commerce
        </Link>
        <ul className="flex gap-6 font-medium text-gray-700">
          <li>
            <Link href="/" className="hover:text-gray-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-gray-500">
              Products
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:text-gray-500">
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className="relative hover:text-gray-500 flex items-center"
            >
              <ShoppingCart size={20} />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
