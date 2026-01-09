import { test, expect } from "@playwright/test";
const existingEmail = "emirhan@hotmail.com";

test.describe("User Sign Up Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/user/signUp");
  });

  test("should not allow registration with an existing email", async ({
    page,
  }) => {
    await page.getByTestId("email-input").fill(existingEmail);
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("submit-button").click();
    await expect(page.getByText("This email is already in use.")).toBeVisible();
  });

  test("should display error for invalid email format", async ({ page }) => {
    await page.getByTestId("email-input").fill("emirhan");
    await page.getByTestId("submit-button").click();
    await expect(page.getByText("Unexpected email format")).toBeVisible();
  });

  test("should require password to be at least 8 characters long", async ({
    page,
  }) => {
    await page.getByTestId("email-input").fill("newuser@test.com");
    await page.getByTestId("password-input").fill("1234567");
    await page.getByTestId("submit-button").click();
    await expect(page.getByText("Password must be at least 8")).toBeVisible();
  });

  test("should register successfully with valid credentials and redirect to home", async ({
    page,
  }) => {
    const randomEmail = `testuser${Date.now()}@test.com`;
    await page.getByTestId("email-input").fill(randomEmail);
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("submit-button").click();
    await expect(page.getByText("User registration and login")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Explore Products" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Explore Categories" }),
    ).toBeVisible();
  });
});
