import { test, expect } from "@playwright/test";

test("signIn test for admin user", async ({ page }) => {
  const adminEmail = "emirhan.bayatli99@hotmail.com";
  const adminPassword = "12345678";

  await page.goto("http://localhost:3000/");
  await page.getByTestId("signIn-btn-navbar").click();
  await page.getByTestId("email-input").click();
  await page.getByTestId("email-input").fill(adminEmail);
  await page.getByTestId("email-input").press("Tab");
  await page.getByTestId("password-input").fill(adminPassword);
  await page.getByTestId("submit-button").click();
  await page.getByRole("heading", { name: "Welcome to the Admin Dashboard" });
});
test("signIn test for user", async ({ page }) => {
  const userEmail = "emirhan.bayatli99@hotmail.com";
  const userPassword = "12345678";

  await page.goto("http://localhost:3000/");
  await page.getByTestId("signIn-btn-navbar").click();
  await page.getByTestId("email-input").click();
  await page.getByTestId("email-input").fill(userEmail);
  await page.getByTestId("email-input").press("Tab");
  await page.getByTestId("password-input").fill(userPassword);
  await page.getByTestId("submit-button").click();

  await page.getByRole("heading", { name: "Welcome to the Admin Dashboard" });
});
