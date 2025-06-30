export function showStar(n: number) {
  const full = Math.floor(n);
  const half = n - full >= 0.5 ? "⯨" : "";
  const empty = "☆".repeat(5 - full - (half ? 1 : 0));
  return "★".repeat(full) + half + empty;
}
