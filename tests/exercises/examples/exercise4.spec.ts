import { test, expect } from "@playwright/test";
import { LoginPageExample } from "../../../pages/examples/LoginPageExample";
import { AppointmentsExamplePage } from "../../../pages/examples/AppointmentsExamplePage";

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

test("GET appointments fullfilled from response", async ({ page }) => {
  const appointments = new AppointmentsExamplePage(page);

  // Register the mock before the page requests the appointments
  await appointments.mockGetAppointments();

  await appointments.appointmentsBt.click();
  await expect(appointments.appointmentRow("Quality At Speed")).toBeVisible();
  await expect(page.getByText("Quality At Speed")).toHaveCount(1);
});

test("POST appointment fullfilled instead of going to back-end", async ({ page }) => {
  const appointments = new AppointmentsExamplePage(page);

  // Intercept the create request so it never reaches the back-end
  await appointments.mockPostAppointment();

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

  // The POST was fulfilled by the mock, so the appointment was never created.
  // Open the overview and verify the appointment we just "created" is not there.
  await appointments.scheduledFilterBt.click();
  await expect(appointments.appointmentRow("02/10/2026 13:00 Alice Wilson")).toHaveCount(0);
});
