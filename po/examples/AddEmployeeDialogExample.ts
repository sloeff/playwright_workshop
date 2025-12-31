import { Locator, Page } from "@playwright/test";

export class AddEmployeeDialogExample {
  readonly page: Page;
  readonly nextBt: Locator;

  // Tab one
  readonly initials: Locator;
  readonly surename: Locator;
  readonly genderMale: Locator;
  readonly dateOfBirth: Locator;
  readonly employeeNumber: Locator;
  readonly email: Locator;
  readonly postalCode: Locator;
  readonly houseNumber: Locator;
  readonly effectiveDate: Locator;

  // Tab two
  readonly startDate: Locator;
  readonly optionalSchemes: Locator;
  readonly admissionReason: Locator;
  readonly confiromFitForWorkCheckBox: Locator;

  // Tab three
  readonly processMutationBt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.initials = page.locator("div[data-cy=initials]").locator('input');
    this.surename = page.locator("div[data-cy=surname]").locator("input");
    this.genderMale = page.locator("label[data-cy=gender-0]");
    this.dateOfBirth = page.locator("div[data-cy=birthdate]").locator("input");
    this.employeeNumber = page.locator("div[data-cy=employeeNumber]").locator("input");
    this.email = page.locator("div[data-cy=email]").locator("input");
    this.postalCode = page.locator("div[data-cy=nl-postal-code]").locator("input");
    this.houseNumber = page.locator("div[data-cy=nl-house-number]").locator("input");
    this.effectiveDate = page.locator("div[data-cy=effectiveDate]").locator("input");
    this.nextBt = page.getByRole("button", { name: "Volgende" });
    this.startDate = page.locator("div[data-cy=start-date]").locator("input");
    this.optionalSchemes = page.locator('label[data-cy="optional-schemes-input-0"]').locator("input");
    this.admissionReason = page.locator('div[data-cy="admission-reason"]').locator("select");
    this.confiromFitForWorkCheckBox = page.locator('label[data-cy="confirm-fit-for-work"]');
    this.processMutationBt = page.getByRole("button", { name: "Mutatie verwerken" });
  }

  async selectAdmissionReason(reason: string): Promise<void> {
    await this.admissionReason.selectOption(reason);
  }

  async abortEmployeeCreation({request}): Promise<void>{
    await this.page.route('https://api-tst.nn-group.com/t/nn.nl/emp/v1/mutations/employers/0505435861/type/employment_new',route => {
      route.fulfill({status: 202, body: '{"mutation":"accepted"}'})
    })
  }
}
