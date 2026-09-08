import { test, expect } from "@playwright/test";

test.beforeEach("Login to SecureBank", async ({ page }) => {
  await page.goto("https://qaplayground.com/bank/login");
  await page.getByTestId("login-username-input").fill("standard_user");
  await page.getByTestId("login-password-input").fill("bank_sauce");
  await page.getByTestId("login-submit-btn").click();
});

test("Transfer money from Checking to High-Yield account", async ({ page }) => {
  await page.getByTestId("quick-action-transfer").click();
  await page.getByTestId("transfer-from-select").click();
  await page.getByRole("option", { name: "Everyday Checking — $" }).click();
  await page.getByTestId("transfer-to-select").click();
  await page.getByRole("option", { name: "High-Yield Savings — $" }).click();
  await page.getByTestId("transfer-amount-input").fill("1");
  await page.getByRole("textbox", { name: "e.g. Rent, vacation fund…" }).fill("Bla");
  await page.getByTestId("review-transfer-btn").click();
  await expect(page.getByTestId("transfer-confirm-summary").getByText("$1.00")).toBeVisible();
  await expect(page.getByText("Bla")).toBeVisible();
  await page.getByTestId("confirm-transfer-btn").click();
  await expect(page.getByTestId("transfer-success-heading")).toBeVisible();
  await expect(page.getByTestId("transfer-ref-id")).toBeVisible();
});

test("View all account activitity", async ({ page }) => {
  await page.getByTestId("quick-action-transactions").click();
  await expect(page.getByRole("cell", { name: "Amazon.com" })).toBeVisible();
});
