import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/user/signIn");
});
test.describe("SignIn Page", () => {
  test("should sign in successfully with valid credentials", async ({
    page,
  }) => {
    await expect(page.getByRole("link", { name: "E-Commerce" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
    await expect(
      page.getByText("Don't have an account? Sign Up"),
    ).toBeVisible();
    await page.getByTestId("email-input").click();

    await page.getByTestId("email-input").fill("emirhan@hotmail.com");
    await page.getByTestId("email-input").press("Tab");
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("submit-button").click();

    await expect(page.getByTestId("success-message-sign-in")).toBeVisible({
      timeout: 10_000,
    });

    await expect(page.getByRole("link", { name: "emirhan" })).toBeVisible({
      timeout: 10_000,
    });
  });
  test("shoud not sign in wrong password", async ({ page }) => {
    await page.getByTestId("email-input").click();

    await page.getByTestId("email-input").fill("emirhan@hotmail.com");
    await page.getByTestId("email-input").press("Tab");
    await page.getByTestId("password-input").fill("12346678");
    await page.getByTestId("submit-button").click();

    await expect(page.getByTestId("error-message-sign-in")).toBeVisible({
      timeout: 40_000,
    });
  });
  test("shoud not sign in wrong email", async ({ page }) => {
    await page.getByTestId("email-input").click();

    await page.getByTestId("email-input").fill("emirhan1@mail.com");
    await page.getByTestId("email-input").press("Tab");
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("submit-button").click();

    await expect(page.getByTestId("error-message-sign-in")).toBeVisible({
      timeout: 20_000,
    });
  });
});
