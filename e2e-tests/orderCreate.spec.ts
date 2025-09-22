import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test.describe("Order Create", () => {
  test("should create order success", async ({ page }) => {
    await page.getByRole("link", { name: "Products" }).click();
    await page
      .getByRole("link", { name: "update stripe price id update" })
      .click();
    await page.getByRole("button", { name: "Add To Cart" }).click();
    await page.getByRole("link", { name: "1" }).click();
    await page.getByRole("button", { name: "Check Out" }).click();
    await page.getByPlaceholder("email@example.com").click();
    await page
      .getByPlaceholder("email@example.com")
      .fill("emirhan.bayatli99@icloud.com");
    await page.getByPlaceholder("email@example.com").press("Tab");
    await page
      .getByPlaceholder("1234 1234 1234 1234")
      .fill("4242 4242 4242 4242");
    await page.getByPlaceholder("1234 1234 1234 1234").press("Tab");
    await page.getByPlaceholder("MM / YY").fill("09 / 29");
    await page.getByPlaceholder("MM / YY").press("Tab");
    await page.getByPlaceholder("CVC").fill("123");
    await page.getByPlaceholder("CVC").press("Tab");
    await page.getByPlaceholder("Full name on card").fill("Emirhan Bayatli");
    await page.getByTestId("hosted-payment-submit-button").click();

    await expect(page.getByText("Thank you for your order!")).toBeVisible({
      timeout: 20000,
    });
  });
});
