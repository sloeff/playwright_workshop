import { test, expect } from "@playwright/test";
import { LoginPageExample } from "../po/examples/LoginPageExample";

const authFile = 'user.json'

test.beforeEach('skipEndpoints',async({page})=>{
  const loginPage = new LoginPageExample(page)
  loginPage.skipEndpoints()
})

test("Login with customer, accept cookies and store state", async ({ page }) => {
  const loginPage = new LoginPageExample(page);
  await page.goto("https://www.test.portal.nn.insim.biz/Inloggen-zakelijk.htm");
  await loginPage.acceptCookies.click();
  await loginPage.userNameInput.fill("test_14727144");
  await loginPage.passwordInput.fill("Password01");
  await loginPage.loginBt.click();
  await expect(page.locator("h1")).toContainText("Nicolette", {
      timeout: 15000,
    });
  await page.context().storageState({ path: authFile });
});
