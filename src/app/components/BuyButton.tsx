"use client";

import { checkout } from "@/app/actions/cart/checkout";

export const BuyButton = ({ productId }: { productId: string }) => {
  return (
    <form action={checkout}>
      <input type="hidden" name="productId" value={productId} />
      <button
        type="submit"
        className="text-[#49739c] text-sm font-normal leading-normal"
      >
        Buy Now
      </button>
    </form>
  );
};
