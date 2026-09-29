import { test, expect } from "@playwright/test";
import { LoginPageExample } from "../../pages/examples/LoginPageExample";

/*
Test one:
Handle the GET appointments route to be fullfilled with a given response
https://playwright.dev/docs/api/class-route#route-fulfill
Verify that only the appointment in the response is shown on screen

Test two:
Handle the POST appointments route, so the request doesn't reach the back-end
Verify that the appointment was indeed not sent to the server
What happens if you return http status 500 instead of 201?
*/

test.beforeEach("Login to Assistant portal", async ({ page }) => {
  const loginPage = new LoginPageExample(page);
  await loginPage.login();
});

test("GET appointments fullfilled from response", async ({ page }) => {});

test("POST appointment fullfilled instead of going to back-end", async ({ page }) => {});
