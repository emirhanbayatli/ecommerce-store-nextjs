import { test, expect } from "@playwright/test";
const randomId = Date.now();
const adminEmail = "emirhan.bayatli99@icloud.com";
const adminPassword = "12345678";
const mockTitle = `Dummy product ${randomId}`;
const mockDesc = `Welcome dummy productWelcome dummy productWelcome dummy product ${randomId}`;

test("Admin should successfully create a dummy product", async ({ page }) => {
  await page.goto("http://localhost:3000/admin");
  await page.getByTestId("email-input").fill(adminEmail);
  await page.getByTestId("password-input").fill(adminPassword);
  await page.getByTestId("submit-button").click();
  await expect(
    page.getByRole("heading", { name: "Welcome to the Admin Dashboard" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Products" }).nth(1).click();

  await expect(page.getByTestId("addNewBtn")).toBeVisible();
  await page.getByTestId("addNewBtn").click();

  await page.getByRole("textbox", { name: "Title" }).fill(mockTitle);
  await page.getByRole("textbox", { name: "Description" }).fill(mockDesc);

  await page.getByLabel("Category").selectOption("Laptops");

  await page.getByRole("spinbutton", { name: "Price" }).fill("1212");
  await page
    .getByRole("spinbutton", { name: "Discount Percentage" })
    .fill("12");
  await page.getByRole("spinbutton", { name: "Stock" }).fill("1");

  await page.getByRole("checkbox", { name: "Tablets" }).check();

  await page.getByRole("textbox", { name: "Brand" }).fill("12");
  await page.getByRole("textbox", { name: "SKU" }).fill("12");
  await page.getByRole("spinbutton", { name: "Weight" }).fill("12");
  await page.getByPlaceholder("Width").fill("12");
  await page.getByPlaceholder("Height").fill("12");
  await page.getByPlaceholder("Depth").fill("12");

  await page.getByRole("textbox", { name: "Warranty Information" }).fill("12");
  await page.getByRole("textbox", { name: "Shipping Information" }).fill("12");

  await page.getByRole("radio", { name: "In Stock" }).click();
  await page.getByRole("radio", { name: "No return policy" }).click();

  await page
    .getByRole("spinbutton", { name: "Minimum Order Quantity" })
    .fill("12");
  await page.getByText("Standard").click();

  await page.getByRole("button", { name: "Create Product" }).click();

  await expect(page.getByText(mockTitle)).toBeVisible();
});
