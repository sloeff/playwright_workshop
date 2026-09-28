import { test, expect } from "@playwright/test";

test.beforeEach("Login to Assistant Portal", async ({ page }) => {
  await page.goto("http://localhost:5175/login");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("assistant.brown@clinic.local");
  await page.getByRole("textbox", { name: "Password" }).fill("Clinic1234!");
  await page.getByRole("button", { name: "Sign in" }).click();
});

test("Create appointment and cancel it", async ({ page }) => {
  await page.getByRole("link", { name: "Appointments" }).click();
  await page.getByRole("button", { name: "+ New appointment" }).click();
  await page.getByRole("combobox", { name: "Patient" }).click();
  await page.getByRole("combobox", { name: "Patient" }).fill("al");
  await page.getByRole("option", { name: "Alice Wilson — patient.wilson" }).click();
  await page.getByRole("combobox", { name: "Doctor" }).click();
  await page.getByRole("option", { name: "Dr. Michael Williams —" }).click();
  await page.getByRole("textbox", { name: "Date & Time" }).click();
  await page.getByRole("gridcell", { name: "Choose Friday, October 2nd," }).click();
  await page.getByRole("option", { name: "13:00" }).click();
  await page.getByRole("textbox", { name: "Notes (optional)" }).fill("This is a custom note");
  await page.getByRole("button", { name: "Create appointment" }).click();
  await page.getByRole("button", { name: "SCHEDULED" }).click();
  await expect(page.getByRole("button", { name: "Scheduled" })).toHaveClass(/text-white/);
  await page.getByRole("row", { name: "02/10/2026 13:00 Alice Wilson" }).getByLabel("Edit appointment for Alice").click();
  await expect(page.getByRole("textbox", { name: "Date & Time" })).toHaveValue("02/10/2026 13:00");
  await expect(page.getByRole("textbox", { name: "Notes" })).toHaveValue("This is a custom note");
  await page.getByLabel("Status").selectOption("CANCELLED");
  await page.getByRole("button", { name: "Save changes" }).click();
});

test("Completed appointment cannot be cancelled", async ({ page }) => {
  await page.goto("http://localhost:5175/login");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("assistant.brown@clinic.local ");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("Clinic1234!");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Appointments" }).click();
  await page.getByRole("button", { name: "COMPLETED" }).click();
  await page.getByRole("button", { name: "Edit appointment for Alice Wilson with Dr. James Smith" }).click();
  await expect(page.getByRole("button", { name: "Save changes" })).not.toBeVisible();
});
