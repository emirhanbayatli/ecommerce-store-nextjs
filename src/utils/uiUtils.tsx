export function showStar(n: number) {
  const full = Math.floor(n);
  const half = n - full >= 0.5 ? "⯨" : "";
  const empty = "☆".repeat(5 - full - (half ? 1 : 0));
  return "★".repeat(full) + half + empty;
}
export function discountCalculation(
  price: number,
  discountPercentage: number,
): number {
  if (discountPercentage > 0) {
    const discountAmount = (price * discountPercentage) / 100;
    const finalPrice = price - discountAmount;
    return parseFloat(finalPrice.toFixed(2));
  }
  return price;
}
