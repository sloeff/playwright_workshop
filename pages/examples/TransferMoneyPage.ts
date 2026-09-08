import { expect, Locator, Page } from "@playwright/test";

export class TransferMoneyPage {
  readonly page: Page;
  readonly transferFromSelect: Locator;
  readonly transferToSelect: Locator;
  readonly transferAmountInput: Locator;
  readonly memoInput: Locator;
  readonly reviewTransferBt: Locator;
  readonly transferConfirmSummary: Locator;
  readonly confirmTransferBt: Locator;
  readonly transferSuccessHeading: Locator;
  readonly transferRefId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transferFromSelect = page.getByTestId("transfer-from-select");
    this.transferToSelect = page.getByTestId("transfer-to-select");
    this.transferAmountInput = page.getByTestId("transfer-amount-input");
    this.memoInput = page.getByRole("textbox", { name: "e.g. Rent, vacation fund…" });
    this.reviewTransferBt = page.getByTestId("review-transfer-btn");
    this.transferConfirmSummary = page.getByTestId("transfer-confirm-summary");
    this.confirmTransferBt = page.getByTestId("confirm-transfer-btn");
    this.transferSuccessHeading = page.getByTestId("transfer-success-heading");
    this.transferRefId = page.getByTestId("transfer-ref-id");
  }
}
