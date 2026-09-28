import { Locator, Page } from "@playwright/test";

export class LoginPageExample {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signinBt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.signinBt = page.getByRole("button", { name: "Sign in" });
  }

  async login(): Promise<void> {
    await this.page.goto("http://localhost:5175/login");
    await this.signinBt.click();
    await this.emailInput.fill("assistant.brown@clinic.local");
    await this.passwordInput.fill("Clinic1234!");
    await this.signinBt.click();
  }
}
