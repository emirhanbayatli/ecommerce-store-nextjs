"use client";

import { checkout } from "@/app/actions/cart/checkout";
import { useCartContext } from "../CartContextProvider";

export const BuyAllButton = () => {
  const cart = useCartContext();

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

      <button
        type="submit"
        className="text-[#49739c] text-sm font-normal leading-normal"
      >
        Buy All
      </button>
    </form>
  );
};
