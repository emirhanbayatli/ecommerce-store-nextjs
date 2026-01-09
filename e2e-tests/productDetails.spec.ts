import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test.describe("Product Page", () => {
  test("should display the correct product details and increment basket count", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Products" }).click();
    await page
      .getByRole("link", { name: "Apple Airpods Apple Airpods" })
      .click();
    await page.getByRole("button", { name: "Add To Cart" }).click();
    await expect(page.getByRole("link", { name: "1" })).toBeVisible();
  });
});
