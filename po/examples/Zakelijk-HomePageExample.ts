import { Locator, Page, expect } from "@playwright/test";

export class ZakelijkHomePageExample {
  readonly page: Page;
  readonly addEmployeeBt: Locator;
  constructor(page: Page) {
    this.page = page;
    this.addEmployeeBt = this.page.getByText("Werknemer toevoegen");
  }
  async selectProduct(productName: string) {
    await this.page.locator("a", { hasText: productName }).click();
  }

  async abortPOSTNewEmployee(): Promise<void> {
    await this.page.route("**/v1/mutations/employers/**/type/employment_new", async (route) => {
      const newEmployeeReq = route.request().postDataJSON();
      console.log(newEmployeeReq);
      route.fulfill({ status: 202, body: '{"mutation":"accepted"}' });
      expect(newEmployeeReq.source).toContain("NNZE");
      expect(newEmployeeReq.type).toContain("employment_new");
      expect(newEmployeeReq.employee.initials).toContain("ABC");
    });
  }
}
