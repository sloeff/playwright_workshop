import { test, expect } from "@playwright/test";

/* Open Playwright codegen the terminal
npx playwright codegen https://practicesoftwaretesting.com
Follow the steps below:
    1. Search for "hammer" 
    2. Open "Thor Hammer" detail page
    3. Add "Thor Hammer" to the cart
    4. Navigate to the cart and verify that "Thor Hammer" is in the cart
    5. Proceed to checkout
    6. Use a guest a account, use your own e-mail and name to continue as a guest
    7. Provide a valid Dutch postal code to continue
    8. Provide dummy bank details and confirm the payment
    9. Verify that the payment is confirmed, then confirm to continue
    10. Verify that an invoice number is created

  What happens if you remove the verifcation on step 9?
*/

test("Order Thor Hammer from practicesoftwaretesting.com", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="search-query"]').fill("hammer");
  await page.locator('[data-test="search-query"]').press("Enter");
  await page.locator('[data-test="product-01M200GJA4P4HJ6H882RHSQHBX"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="nav-cart"]').click();
  await expect(page.getByRole("cell", { name: "Thor Hammer", exact: true })).toBeVisible();
  await page.locator('[data-test="proceed-1"]').click();
  await page.getByRole("tab", { name: "Continue as Guest" }).click();
  await page.locator('[data-test="guest-email"]').fill("dummy.email@email.com");
  await page.locator('[data-test="guest-first-name"]').fill("Trainer");
  await page.locator('[data-test="guest-last-name"]').fill("Course");
  await page.locator('[data-test="guest-submit"]').click();
  await page.locator('[data-test="proceed-2-guest"]').click();
  await page.locator('[data-test="country"]').selectOption("NL");
  await page.locator('[data-test="postal_code"]').fill("1111AA");
  await page.locator('[data-test="house_number"]').fill("1");
  await page.locator('[data-test="proceed-3"]').click();
  await page.locator('[data-test="payment-method"]').selectOption("bank-transfer");
  await page.locator('[data-test="bank_name"]').fill("ABC Bank");
  await page.locator('[data-test="account_name"]').fill("T. Course");
  await page.locator('[data-test="account_number"]').fill("123456789");
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="payment-success-message"]')).toBeVisible();
  await page.locator('[data-test="finish"]').click();
  await expect(page.getByText("Thanks for your order! Your")).toBeVisible();
});
