import { test, expect } from "@playwright/test";
import { LoginPageExample } from "../../../pages/examples/LoginPageExample";

// Verify that the request message contains the correct data
// Abort the request so the new employee isn't created in SAP

test.beforeEach("Login to Assistant portal", async ({ page }) => {
  const loginPage = new LoginPageExample(page);
  await loginPage.login();
});
