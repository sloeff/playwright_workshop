import { test, expect } from "@playwright/test";

/* Open Playwright codegen the terminal
npx playwright codegen https://qaplayground.com/bank/login
Follow the steps below:
    1. Login using the standard_user account (credentials are listed on the login page)
    2. Open the "Transfer Money" page
    3. Transfer 1 dollar from "Everyday Checking" to "High-Yield Saving"
    4. Add a memo of your chosing
    5. Set "Transfer Date" to "Today" and review the Transfer
    6. Verify the amount and memo are visible on the review pop-up and confirm
    7. Verify the succesfull status and a reference number is returned
*/

test("Transfer money from Checking account to High-Yield account", async ({ page }) => {
  await page.goto("https://qaplayground.com/bank/login");
  await page.getByTestId("login-username-input").fill("standard_user");
  await page.getByTestId("login-password-input").fill("bank_sauce");
  await page.getByTestId("login-submit-btn").click();
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
