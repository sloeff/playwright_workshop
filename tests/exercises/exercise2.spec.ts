import { test, expect } from "@playwright/test";

test.beforeEach("Login to SecureBank", async ({ page }) => {
  // Move the login steps into the beforeEach code
});

test("Transfer money from Checking to High-Yield account", async ({ page }) => {
  // Move the steps to transfer money to this test
  // Hint: Copy-Paste the steps from exercise one
});

test("View all account activitity", async ({ page }) => {
  // Created a new test in this block that verifies activities on all accounts
  // You can choose the tests to your liking
});
