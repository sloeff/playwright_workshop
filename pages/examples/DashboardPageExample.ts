import { Locator, Page } from "@playwright/test";

export class DashboardPageExample {
  readonly page: Page;
  readonly quickTransferBt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quickTransferBt = page.getByTestId("quick-action-transfer");
  }
}
