"use client";

export const BuyButton = ({ productId }: { productId: string }) => {
  return (
    <form action="/api/checkout_session" method="POST">
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
