import { test, expect } from "@playwright/test";

const adminEmail = "emirhan.bayatli99@icloud.com";
const adminPassword = "12345678";

test("Admin should successfully update a dummy product", async ({ page }) => {
  const randomId = Date.now();
  const mockTitle = `Dummy product ${randomId}`;
  const mockDesc = `Welcome dummy productWelcome dummy productWelcome dummy product${randomId}`;
  await page.goto("http://localhost:3000/admin");
  await page.getByTestId("email-input").fill(adminEmail);
  await page.getByTestId("password-input").fill(adminPassword);
  await page.getByTestId("submit-button").click();
  await expect(
    page.getByRole("heading", { name: "Welcome to the Admin Dashboard" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Products" }).nth(1).click();
  await page.getByRole("button", { name: "Edit" }).nth(1).click();

  await page.getByTestId("title").fill(mockTitle);
  await page.getByRole("textbox", { name: "Description" }).fill(mockDesc);

  await page.getByRole("spinbutton", { name: "Price" }).fill("100");

  await page.getByRole("spinbutton", { name: "Discount Percentage" }).fill("9");

  await page.getByRole("spinbutton", { name: "Stock" }).fill("100");

  await page.getByText("Standard").click();
  await page.getByRole("button", { name: "Update Product" }).click();
  await page.getByRole("link", { name: mockTitle }).click();
  await expect(page.getByText(mockTitle)).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(mockDesc)).toBeVisible();
  await expect(page.getByText("$100")).toBeVisible();
});
