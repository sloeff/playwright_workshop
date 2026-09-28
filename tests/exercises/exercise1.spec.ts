import { test } from "@playwright/test";

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
  // Paste the steps here
});

test("Completed appointment cannot be cancelled", async ({ page }) => {
  // Paste the steps here
});
