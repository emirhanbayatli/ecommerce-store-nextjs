import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/user/signUp");
});

test.describe("SignUp Page", () => {
  test("should sign Up successfully", async ({ page }) => {
    const randomNumber = Date.now();

    const dummyEmail = `test-${randomNumber}@hotmail.com`;

    await expect(page.getByRole("link", { name: "E-Commerce" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();
    await expect(
      page.getByText("Already have an account?  Sign In"),
    ).toBeVisible();
    await page.getByTestId("email-input").click();

    await page.getByTestId("email-input").fill(dummyEmail);
    await page.getByTestId("email-input").press("Tab");
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("submit-button").click();

    await expect(
      page.getByText("User registration and login were successful."),
    ).toBeVisible();

    await expect(page.getByText(dummyEmail.split("@")[0])).toBeVisible({
      timeout: 10_000,
    });
  });
  test("should not sign up already have an email", async ({ page }) => {
    await page.getByTestId("email-input").click();

    await page.getByTestId("email-input").fill("emirhan@hotmail.com");
    await page.getByTestId("email-input").press("Tab");
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("submit-button").click();

    await expect(page.getByTestId("error-message-sign-up")).toBeVisible({
      timeout: 20_000,
    });
  });
});
