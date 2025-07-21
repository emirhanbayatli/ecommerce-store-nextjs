"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "../CartContextProvider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { allCategories, Category } from "@/types/types";

export default function Navbar() {
  const cart = useCartContext();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
          <li className="hover:text-gray-500">
            <div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                    Categories
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {allCategories.map((category) => {
                      return (
                        <MenuItem>
                          <a
                            key={category}
                            href={`/categories/${category}`}
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                          >
                            {category}
                          </a>
                        </MenuItem>
                      );
                    })}
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </li>
          <li>
            <Link href="/products" className="hover:text-gray-500">
              Products
            </Link>
          </li>

          <li>
            <Link href="/user/signIn" className="hover:text-gray-500">
              Sign In
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
