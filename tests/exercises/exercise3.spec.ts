import { test, expect } from "@playwright/test";

// Create a function within LoginPage Class that handles the login steps
// Use the function within the beforeEach
// Move locators to the new Page Object Model Classes
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

// Rewrite the locators to Page Object Model
test("Add Employee", async ({ page }) => {
  await test.step("Select product", async () => {
    await page.getByText("WGA Hiaat Aanvullingszekerheid Plus").click();
  });
  await test.step("Enter Basisgegevens", async () => {
    await page.getByText("Werknemer toevoegen").click();
    await page.locator("div[data-cy=initials]").locator("input").fill("A.B.C.");
    await page.locator("div[data-cy=surname]").locator("input").fill("Test");
    await page.locator("label[data-cy=gender-0]").check();
    await page.locator("div[data-cy=birthdate]").locator("input").fill("01-01-1970");
    await page.locator("div[data-cy=employeeNumber]").locator("input").fill("123456789");
    await page.locator("div[data-cy=email]").locator("input").fill("test@test.nl");
    await page.locator("div[data-cy=nl-postal-code]").locator("input").fill("1000AA");
    await page.locator("div[data-cy=nl-house-number]").locator("input").fill("1");
    await page.keyboard.press("Tab");
    await page.locator("div[data-cy=effectiveDate]").locator("input").fill("01-01-2023");
    await page.getByRole("button", { name: "Volgende" }).click();
  });
  await test.step("Enter Regelingen", async () => {
    await page.locator("div[data-cy=start-date]").locator("input").fill("01-01-2023");
    await page.getByRole("checkbox", { name: "WGA Hiaat Aanvullingszekerheid Plus" }).check();
    await page.locator('div[data-cy="admission-reason"]').locator("select").selectOption("Nieuwe werknemer");
    await page.locator('label[data-cy="confirm-fit-for-work"]').click();
    await page.getByRole("button", { name: "Volgende" }).click();
  });
  await test.step("Bevestingen", async () => {
    await expect(page.getByRole("button", { name: "Mutatie verwerken" })).toBeVisible();
  });
});
