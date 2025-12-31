import { test, expect } from "@playwright/test";
import { LoginPageExample } from "../../../po/examples/LoginPageExample";
import { ZakelijkHomePageExample } from "../../../po/examples/Zakelijk-HomePageExample";
import { AddEmployeeDialogExample } from "../../../po/examples/AddEmployeeDialogExample";

// Verify that the request message contains the correct data
// Abort the request so the new employee isn't created in SAP

test.beforeEach("Login to NN zakelijk", async ({ page }) => {
  const loginPage = new LoginPageExample(page);
  loginPage.loginNNZakelijk("ci4000012179", "Password01");
});

test("Add Employee", async ({ page }) => {
  const zakelijkPage = new ZakelijkHomePageExample(page);
  const addEmployeePage = new AddEmployeeDialogExample(page);
  await test.step("Select product", async () => {
    await zakelijkPage.selectProduct("WGA Hiaat Aanvullingszekerheid Plus");
  });
  await test.step("Enter Basisgegevens", async () => {
    await zakelijkPage.addEmployeeBt.click();
    await addEmployeePage.initials.fill("A.B.C.");
    await addEmployeePage.surename.fill("Test");
    await addEmployeePage.genderMale.check();
    await addEmployeePage.dateOfBirth.fill("01-01-1970");
    await addEmployeePage.employeeNumber.fill("123456789");
    await addEmployeePage.email.fill("test@test.nl");
    await addEmployeePage.postalCode.fill("2595AK");
    await addEmployeePage.houseNumber.fill("35");
    await page.keyboard.press("Tab");
    await addEmployeePage.effectiveDate.fill("01-01-2023");
    await addEmployeePage.nextBt.click();
  });
  await test.step("Choose Regelingen", async () => {
    await addEmployeePage.startDate.fill("01-01-2023");
    await addEmployeePage.optionalSchemes.check();
    await addEmployeePage.selectAdmissionReason("Nieuwe werknemer");
    await addEmployeePage.confiromFitForWorkCheckBox.click();
    await addEmployeePage.nextBt.click();
  });
  await test.step("Bevestigen", async () => {
    await zakelijkPage.abortPOSTNewEmployee();
    await expect(addEmployeePage.processMutationBt).toBeVisible();
    await addEmployeePage.processMutationBt.click();
  });
});
