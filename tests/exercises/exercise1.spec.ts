import { test } from "@playwright/test";

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
  // Paste the steps here
});
