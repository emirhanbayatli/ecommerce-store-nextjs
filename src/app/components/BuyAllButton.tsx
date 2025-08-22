"use client";

import { checkout } from "@/app/actions/cart/checkout";

type BuyAllButtonProps = {
  cart: { stripePriceId: string; quantity: number }[];
};
export const BuyAllButton = ({ cart }: BuyAllButtonProps) => {
  return (
    <form action={checkout}>
      {cart.map((item, index) => (
        <div key={index}>
          <input
            type="hidden"
            name={`items[${index}][price]`}
            value={item.stripePriceId}
          />
          <input
            type="hidden"
            name={`items[${index}][quantity]`}
            value={item.quantity}
          />
        </div>
      ))}

      <button
        type="submit"
        className="text-[#49739c] text-sm font-normal leading-normal"
      >
        Buy All
      </button>
    </form>
  );
};
