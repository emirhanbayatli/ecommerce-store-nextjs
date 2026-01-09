import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Home Page", () => {
  test("should display the correct titles", async ({ page }) => {
    await expect(page.getByRole("link", { name: "E-Commerce" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Categories" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Explore Products" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Explore Categories" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Featured Products" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "About Us" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Support" })).toBeVisible();
  });
  test("should display the correct detail ", async ({ page }) => {
    await page.getByRole("heading", { name: "PlayStation 5 Slim" }).click();
    await expect(
      page.getByRole("heading", { name: "PlayStation 5 Slim" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "E-Commerce" }).click();
    await page
      .getByRole("link", { name: "Apple Watch Series 10 Apple" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Apple Watch Series" }),
    ).toBeVisible();
  });
  test("should display the correct search ", async ({ page }) => {
    await page.getByRole("textbox").fill("apple");
    await expect(
      page.getByRole("link", { name: "Apple Airpods Apple Airpods $" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: "Apple Watch Series 10 Apple Watch Series 10 $",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: "Apple MacBook Pro 14 Inch Space Grey Apple MacBook Pro 14 Inch Space Grey $",
      }),
    ).toBeVisible();
  });
  test("should display the correct category name ", async ({ page }) => {
    await page.getByRole("button", { name: "Categories" }).click();
    await expect(
      page.getByRole("menuitem", { name: "Smartphones" }),
    ).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Laptops" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Tablets" })).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: "Smartwatches" }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: "Speakers" }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: "Headphones" }),
    ).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Cameras" })).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: "Computer Accessories" }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: "Computer Accessories" }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: "Gaming Consoles" }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: "Networking Devices" }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: "Wearable Tech" }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: "Smart Home Devices" }),
    ).toBeVisible();
  });
});
