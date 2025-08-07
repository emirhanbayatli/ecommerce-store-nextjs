"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "../CartContextProvider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { allCategories } from "@/types/types";
import { useAuthContext, useAuthDispatchContext } from "../AuthContextProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = useAuthContext();
  const setUser = useAuthDispatchContext();
  const cart = useCartContext();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const userName = user?.split("@")[0];
  const router = useRouter();

  function logOutAction() {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  }
  return (
    <nav className="bg-gray-100 shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-700 hover:text-gray-500"
        >
          E-Commerce
        </Link>
        <ul className="flex items-center gap-6 font-medium text-gray-700">
          <li className="hover:text-gray-500">
            <div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 cursor-pointer">
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
                        <MenuItem key={category}>
                          <a
                            href={`/categories/${category
                              .toLowerCase()
                              .replace(" ", "-")}`}
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
          {user !== null ? <li>{userName}</li> : null}

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
