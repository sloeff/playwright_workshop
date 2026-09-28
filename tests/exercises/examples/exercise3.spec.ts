import { test, expect } from "@playwright/test";
import { LoginPageExample } from "../../../pages/examples/LoginPageExample";
import { AppointmentsExamplePage } from "../../../pages/examples/AppointmentsExamplePage";

// Create a function within LoginPage.ts that handles the login steps
// Use the function within the beforeEach
// Use Page Object model for Locators

test.beforeEach("Login to Assistant portal", async ({ page }) => {
  const loginPage = new LoginPageExample(page);
  await loginPage.login();
});

// Rewrite the locators to Page Object Model
test("Create appointment and cancel it", async ({ page }) => {
  const appointments = new AppointmentsExamplePage(page);

  await appointments.appointmentsBt.click();
  await appointments.newAppointmentBt.click();
  await appointments.patientInput.click();
  await appointments.patientInput.fill("al");
  await appointments.option("Alice Wilson — patient.wilson").click();
  await appointments.doctorInput.click();
  await appointments.option("Dr. Michael Williams —").click();
  await appointments.dateTimeInput.click();
  await appointments.dateCell("Choose Friday, October 2nd,").click();
  await appointments.option("13:00").click();
  await appointments.notesInput.fill("This is a custom note");
  await appointments.createAppointmentBt.click();
  await appointments.scheduledFilterBt.click();
  await expect(appointments.scheduledFilterBt).toHaveClass(/text-white/);

  const row = appointments.appointmentRow("02/10/2026 13:00 Alice Wilson");
  await appointments.editAppointmentBt(row, "Alice").click();
  await expect(appointments.editDateTimeInput).toHaveValue("02/10/2026 13:00");
  await expect(appointments.editNotesInput).toHaveValue("This is a custom note");
  await appointments.statusSelect.selectOption("CANCELLED");
  await appointments.saveChangesBt.click();
});
