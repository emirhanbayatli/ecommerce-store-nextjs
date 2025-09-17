import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Home Page", () => {
  test("should display the correct title", async ({ page }) => {
    expect(await page.getByRole("link", { name: "E-Commerce" })).toBeVisible();
    expect(
      await page.getByRole("heading", { name: "Categories" }),
    ).toBeVisible();
    expect(
      await page.getByRole("heading", { name: "Featured Products" }),
    ).toBeVisible();
    expect(await page.getByRole("heading", { name: "About Us" })).toBeVisible();
    expect(
      await page.getByRole("heading", { name: "Customer Service" }),
    ).toBeVisible();
    expect(await page.getByRole("heading", { name: "Support" })).toBeVisible();
  });
});
