import { test, expect } from "@playwright/test";

const adminEmail = "emirhan.bayatli99@icloud.com";
const adminPassword = "12345678";

test.describe("Admin Panel: Customers Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/admin");
    await page.getByTestId("email-input").fill(adminEmail);

    await page.getByTestId("password-input").fill(adminPassword);
    await page.getByTestId("submit-button").click();

    await expect(
      page.getByRole("heading", { name: "Welcome to the Admin Dashboard" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Customers" }).click();

    await expect(
      page.getByRole("heading", { name: "Admin Panel" }),
    ).toBeVisible();
  });

  test("should display all required table headers and main users", async ({
    page,
  }) => {
    await expect(page.getByRole("cell", { name: "Email" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Role", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "User ID" })).toBeVisible();

    await expect(page.getByRole("cell", { name: adminEmail })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "emirhan@hotmail.com" }),
    ).toBeVisible();
  });

  test("should successfully change a user's role", async ({ page }) => {
    await page
      .locator("tr:nth-child(10) > td:nth-child(5) > .inline-flex")
      .click();

    await expect(page.getByText("Are you sure you want to")).toBeVisible();
    await page.getByRole("button", { name: "Confirm" }).click();
    await expect(page.getByText("Admin").nth(2)).toBeVisible();
  });
});
