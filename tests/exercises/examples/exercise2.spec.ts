import { test, expect } from "@playwright/test";

// Move the login steps into the beforeEach code
test.beforeEach("Login to NN zakelijk", async ({ page }) => {
  await page.goto("Inloggen-zakelijk.htm");
  await page.locator("#accept-recommended-btn-handler").click();
  await page.locator("input[name=username]").fill("ci4000012179");
  await page.locator("input[name=password]").fill("Password01");
  await page.getByRole("button", { name: "Inloggen" }).click();
  await expect(page.locator("h1")).toContainText("Nicolette", {
    timeout: 15000,
  });
});

test("Verify header details", async ({ page }) => {
  // Assert the header details here
  await expect(page.locator('section[data-test="product-overview"]')).toContainText('KvK 14096367')
});

test('Verify number of products',async({page})=> {
  // Created another test in this block with a different assert
    await expect(page.locator('.c-customer__product-cluster--wrapper')).toHaveCount(3);
    await page.getByText('WGA Hiaat Aanvullingszekerheid Plus').click();
})

