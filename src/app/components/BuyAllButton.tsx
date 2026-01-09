"use client";

import { checkout } from "@/app/actions/cart/checkout";
import { useCartContext } from "../CartContextProvider";
import { useAuthContext } from "../AuthContextProvider";

export const BuyAllButton = () => {
  const cart = useCartContext();
  const { user } = useAuthContext();

  return (
    <form action={checkout}>
      <input
        type="hidden"
        name="cartProducts"
        value={JSON.stringify(
          cart.map((p) => ({
            id: p.id,
            stripePriceId: p.stripePriceId,
            quantity: p.quantity,
          })),
        )}
      />
      <input type="hidden" name="userId" value={user?.id || "guest"} />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-colors duration-200"
      >
        Check Out
      </button>
    </form>
  );
};
