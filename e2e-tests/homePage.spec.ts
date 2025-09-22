import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Home Page", () => {
  test("should display the correct title", async ({ page }) => {
    await expect(page.getByRole("link", { name: "E-Commerce" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Categories" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Featured Products" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "About Us" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Customer Service" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Support" })).toBeVisible();
  });
});
