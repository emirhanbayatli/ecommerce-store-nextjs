import { test, expect } from "@playwright/test";

const adminEmail = "emirhan.bayatli99@icloud.com";
const adminPassword = "12345678";

test("Orders page should display correct details", async ({ page }) => {
  await page.goto("http://localhost:3000/admin");
  await page.getByTestId("email-input").click();
  await page.getByTestId("email-input").fill(adminEmail);
  await page.getByTestId("email-input").press("Tab");
  await page.getByTestId("password-input").fill(adminPassword);
  await page.getByTestId("submit-button").click();
  await expect(
    page.getByRole("heading", { name: "Welcome to the Admin Dashboard" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Orders" })).toBeVisible();
  await page.getByRole("link", { name: "Orders" }).click();
  await expect(
    page.getByRole("cell", { name: "4shXkEj3ATO3h8BuQags" }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Emirhan Bayatlı" }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Update Status" }).first(),
  ).toBeVisible();
});
