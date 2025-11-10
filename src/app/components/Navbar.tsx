"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "../CartContextProvider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { allCategories } from "@/types/types";
import { useAuthContext, useAuthDispatchContext } from "../AuthContextProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Navbar() {
  const user = useAuthContext();
  const setUser = useAuthDispatchContext();
  const cart = useCartContext();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const userName = user?.email?.split("@")[0] || "User";
  const router = useRouter();

  function logOutAction() {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
    toast.success("Logged out successfully!");
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 hover:text-gray-600 transition"
        >
          E-Commerce
        </Link>

        <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          <li>
            <Menu as="div" className="relative">
              <MenuButton className="inline-flex items-center gap-1 cursor-pointer hover:text-gray-500">
                Categories
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none
                data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="py-1">
                  {allCategories.map((category) => (
                    <MenuItem key={category}>
                      <Link
                        href={`/categories/${category
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category}
                      </Link>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </li>

          <li>
            <Link href="/products" className="hover:text-gray-500">
              Products
            </Link>
          </li>

          {user === null ? (
            <li>
              <Link
                href="/user/signIn"
                className="hover:text-gray-500 cursor-pointer"
              >
                Sign In
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={logOutAction}
                className="hover:text-gray-500 cursor-pointer"
              >
                Sign Out
              </button>
            </li>
          )}
          <li>
            {user && (
              <Link href="/user" className="text-gray-600">
                {userName}
              </Link>
            )}
          </li>

          <li>
            <Link
              href="/cart"
              className="relative flex items-center hover:text-gray-500"
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

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 shadow-inner">
          <ul className="flex flex-col gap-4 p-4 font-medium text-gray-700">
            <li>
              <Menu as="div" className="relative w-full">
                <MenuButton className="flex w-full justify-between items-center hover:text-gray-500">
                  Categories
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                </MenuButton>
                <MenuItems
                  transition
                  className="mt-2 w-full origin-top rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none
                  data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {allCategories.map((category) => (
                      <MenuItem key={category}>
                        <Link
                          onClick={() => setIsMenuOpen(false)}
                          href={`/categories/${category
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {category}
                        </Link>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
            </li>

            <li>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/products"
                className="hover:text-gray-500"
              >
                Products
              </Link>
            </li>

            {user === null ? (
              <li>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/user/signIn"
                  className="hover:text-gray-500 cursor-pointer"
                >
                  Sign In
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={logOutAction}
                  className="hover:text-gray-500 cursor-pointer"
                >
                  Sign Out
                </button>
              </li>
            )}
            <li>
              {user && (
                <Link href="/user" className="text-gray-600">
                  {userName}
                </Link>
              )}
            </li>

            <li className="flex justify-start">
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/cart"
                className="hover:text-gray-500 cursor-pointer"
              >
                <div className="relative">
                  <ShoppingCart size={20} className="text-gray-700" />
                  {totalCount > 0 && (
                    <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {totalCount}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
