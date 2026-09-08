import { expect, Locator, Page } from "@playwright/test";

export class LoginPageExample {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.getByTestId("login-username-input");
    this.passwordInput = page.getByTestId("login-password-input");
    this.loginBt = page.getByTestId("login-submit-btn");
  }

  async loginStandardUser(): Promise<void> {
    await this.page.goto("https://qaplayground.com/bank/login");
    await this.userNameInput.fill("standard_user");
    await this.passwordInput.fill("bank_sauce");
    await this.loginBt.click();
  }
}
