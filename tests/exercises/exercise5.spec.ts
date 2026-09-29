import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

/*
  1. Copy `.env.example` to `.env` and fill in the credentials
     assistant.brown@clinic.local // Clinic1234!
  2. Read the credentials below from process.env instead of hardcoding them
  3. Use the credentials to log in and verify the test still passes

  Hints:
  - dotenv is already installed as a dev dependency
  - Access a variable with process.env.MY_VARIABLE

  Docs: https://playwright.dev/docs/test-parameterize#env-files
*/

const username = ""; // read from process.env
const password = ""; // read from process.env

test("Login using credentials from environment variables", async ({ page }) => {
  await page.goto("http://localhost:5175/login");
  // ... fill in the email and password fields, then verify the login succeeded
});
