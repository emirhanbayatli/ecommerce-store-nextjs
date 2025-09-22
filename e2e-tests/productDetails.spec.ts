import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test.describe("Product Page", () => {
  test("should display the correct product details", async ({ page }) => {
    await page
      .getByRole("link")
      .filter({ hasText: "Kiwi2.11 $Limited Stock !" })
      .click();
    await expect(page.getByRole("heading", { name: "Kiwi" })).toBeVisible();
    await expect(page.getByText("Nutrient-rich kiwi, perfect")).toBeVisible();
    await page.getByRole("link", { name: "Products" }).click();
    await page
      .getByRole("link", { name: "Mulberry Mulberry $4.99 4.35" })
      .click();
    await expect(page.getByRole("heading", { name: "Mulberry" })).toBeVisible();
    await expect(page.getByText("Sweet and juicy mulberries,")).toBeVisible();
  });
});
