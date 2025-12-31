import { test, expect } from "@playwright/test";

/* Open Playwright codegen the terminal
npx playwright codegen https://www.test.portal.nn.insim.biz/Inloggen-zakelijk.htm
Follow the steps below:
    1. Accept cookies
    2. Enter username
    3. Enter password
    4. Click inloggen button
    5. Wait till login was successful
    6. Assert the header after a successful login
    7. Assert something else on the page
    8. Copy/Paste the steps in the code below
    9. Review the generated code
*/

test("Login to NN Zakelijk", {tag: '@demo'}, async ({ page }) => {
  await page.goto("https://www.test.portal.nn.insim.biz/Inloggen-zakelijk.htm");
  await page.getByRole("button", { name: "Alle cookies accepteren" }).click();
  await page.locator("input[name=username]").fill("ci4000012179");
  await page.locator("input[name=password]").fill("Password01");
  await page.getByRole("button", { name: "Inloggen" }).click();
  await expect(page.locator("h1")).toContainText("Nicolette",{timeout: 15000});
});
