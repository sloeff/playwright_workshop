import { expect, Locator, Page } from "@playwright/test";

export class LoginPageExample {
  readonly page: Page;
  readonly acceptCookies: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookies = page.locator("#accept-recommended-btn-handler");
    this.userNameInput = page.getByLabel("Gebruikersnaam (Vergeten?)");
    this.passwordInput = page.locator("#password");
    this.loginBt = page.getByTestId("credentials-button-login");
  }

  async loginNNZakelijk(username: string, password: string): Promise<void> {
    await this.page.goto("Inloggen-zakelijk.htm");
    await this.acceptCookies.click();
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBt.click();
    await expect(this.page.locator("h1")).toContainText("Nicolette", {
      timeout: 15000,
    });
  }

  async skipEndpoints(): Promise<void> {
    await this.page.route("https://siteimproveanalytics.com/js/**", async (route) => {
      route.fulfill({ status: 200 });
    });
    await this.page.route("https://geolocation.onetrust.com/cookieconsentpub/**", async (route) => {
      route.fulfill({ status: 200 });
    });
  }
}
