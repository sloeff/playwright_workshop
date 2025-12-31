import { test, expect } from "@playwright/test";
import { LoginPageExample } from "../po/examples/LoginPageExample";

test.beforeEach('skip Endpoints',async({page})=> {
    const loginPage = new LoginPageExample(page)
    loginPage.skipEndpoints()
})

test('Check overview page',async({page})=> {
    await page.goto('/Mijn-NN-Zakelijk.htm#')
    await expect(page.locator('h1')).toContainText('S',{timeout: 15000})
})