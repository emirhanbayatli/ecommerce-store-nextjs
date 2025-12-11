import { test, expect } from "@playwright/test";

test("should handle end-to-end cart management flow", async ({ page }) => {
  await page.goto("http://localhost:3000/products");
  await page.getByRole("link", { name: "Apple Airpods Apple Airpods" }).click();
  await page.getByRole("button", { name: "Add To Cart" }).click();
  await expect(page.getByText("Product added to cart")).toBeVisible();
  await expect(page.getByRole("link", { name: "1" })).toBeVisible();
  await page.goto("http://localhost:3000/products");
  await page.getByRole("link", { name: "PlayStation 5 Slim" }).click();
  await page.getByRole("button", { name: "Add To Cart" }).click();
  await expect(page.getByText("Product added to cart")).toBeVisible();
  await expect(page.getByRole("link", { name: "2" })).toBeVisible();
  await page.goto("http://localhost:3000/cart");
  await expect(
    page
      .getByRole("listitem")
      .filter({ hasText: "Apple AirpodsRemove-1+$109.79$" })
      .locator("span"),
  ).toBeVisible();
  await expect(
    page
      .getByRole("listitem")
      .filter({ hasText: "PlayStation 5 SlimRemove-1+$486.00$" })
      .locator("span"),
  ).toBeVisible();
  await expect(page.getByText("$595.79")).toBeVisible();
  await page.getByRole("button", { name: "+" }).first().click();
  await expect(page.getByText("Product quantity increased.")).toBeVisible();
  await expect(page.getByText("$705.58")).toBeVisible();
  await page.getByRole("button", { name: "-" }).first().click();
  await expect(page.getByText("Product removed from cart.")).toBeVisible();
  await page.getByRole("button", { name: "Clear Cart" }).click();
  await page.getByRole("button", { name: "Yes, Clear Cart" }).click();
  await expect(page.getByText("Cart cleared successfully.")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your cart is currently empty" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Start Shopping" }).click();
  await expect(
    page.getByRole("heading", { name: "Find Your Next Gear" }),
  ).toBeVisible();
});
