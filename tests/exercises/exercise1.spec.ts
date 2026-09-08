import { test } from "@playwright/test";

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
  // Paste the steps here
});
