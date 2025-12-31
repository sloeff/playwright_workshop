import { test, expect } from "@playwright/test";


test.beforeEach("Login to NN zakelijk", async ({ page }) => {
  // Move the login steps into the beforeEach code
});

test("Verify header details", async ({ page }) => {
  // Assert the header details here

});

test('Verify number of products',async({page})=> {
  // Created another test in this block with a different assert
})

