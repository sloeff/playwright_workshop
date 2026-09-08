import { test, expect } from "@playwright/test";
import { LoginPageExample } from "../../../pages/examples/LoginPageExample";
import { DashboardPageExample } from "../../../pages/examples/DashboardPageExample";
import { TransferMoneyPage } from "../../../pages/examples/TransferMoneyPage";

// Create a function within LoginPage.ts that handles the login steps
// Use the function within the beforeEach
// Use Page Object model for Locators

test.beforeEach("Login to SecureBank", async ({ page }) => {
  const loginPage = new LoginPageExample(page);
  loginPage.loginStandardUser();
});

// Rewrite the locators to Page Object Model
test("Transfer money from Checking to High-Yield account", async ({ page }) => {
  const dashboardPage = new DashboardPageExample(page);
  const transferPage = new TransferMoneyPage(page);

  await dashboardPage.quickTransferBt.click();
  await transferPage.transferFromSelect.click();
  await page.getByRole("option", { name: "Everyday Checking — $" }).click();
  await transferPage.transferToSelect.click();
  await page.getByRole("option", { name: "High-Yield Savings — $" }).click();
  await transferPage.transferAmountInput.fill("1");
  await transferPage.memoInput.fill("Bla");
  await transferPage.reviewTransferBt.click();
  await expect(transferPage.transferConfirmSummary.getByText("$1.00")).toBeVisible();
  await expect(page.getByText("Bla")).toBeVisible();
  await transferPage.confirmTransferBt.click();
  await expect(transferPage.transferSuccessHeading).toBeVisible();
  await expect(transferPage.transferRefId).toBeVisible();
});
