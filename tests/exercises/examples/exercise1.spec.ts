import { test, expect } from "@playwright/test";

/* 
  Start Playwright codegen via the terminal
  `npx playwright codegen http://localhost:5175`
  Follow the steps below:
    1. Login using the credentials assistant.brown@clinic.local // Clinic1234!
    2. Schedule a new appointment
    3. Choose any patient / doctor you want
    4. Choose a date later in the week during normal business hours
    5. Provide a note in the appointment
    6. Verify that the appointment is created, including the note
    7. Cancel the appointment

  Create a new test, use codegen again.
    1. Login using the credentials assistant.brown@clinic.local // Clinic1234!
    2. View all complete appointments
    3. Verify in the details that you can't edit the appointment.
*/

test("Create appointment and cancel it", async ({ page }) => {
  await page.goto("http://localhost:5175/login");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("assistant.brown@clinic.local");
  await page.getByRole("textbox", { name: "Password" }).fill("Clinic1234!");
  await page.getByRole("button", { name: "Sign in" }).click();
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
