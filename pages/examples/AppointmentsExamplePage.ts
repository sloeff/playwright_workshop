import { Locator, Page } from "@playwright/test";

export class AppointmentsExamplePage {
  readonly page: Page;

  //Main page
  readonly appointmentsBt: Locator;
  readonly newAppointmentBt: Locator;
  readonly scheduledFilterBt: Locator;

  //New appointment pop-up
  readonly patientInput: Locator;
  readonly doctorInput: Locator;
  readonly dateTimeInput: Locator;
  readonly notesInput: Locator;
  readonly createAppointmentBt: Locator;

  //Edit appointment pop-up
  readonly editDateTimeInput: Locator;
  readonly editNotesInput: Locator;
  readonly statusSelect: Locator;
  readonly saveChangesBt: Locator;

  constructor(page: Page) {
    this.page = page;

    //Main page
    this.appointmentsBt = page.getByRole("link", { name: "Appointments" });
    this.newAppointmentBt = page.getByRole("button", { name: "+ New appointment" });
    this.scheduledFilterBt = page.getByRole("button", { name: "Scheduled" });

    //New appointment pop-up
    this.patientInput = page.getByRole("combobox", { name: "Patient" });
    this.doctorInput = page.getByRole("combobox", { name: "Doctor" });
    this.dateTimeInput = page.getByRole("textbox", { name: "Date & Time" });
    this.notesInput = page.getByRole("textbox", { name: "Notes (optional)" });
    this.createAppointmentBt = page.getByRole("button", { name: "Create appointment" });

    //Edit appointment pop-up
    this.editDateTimeInput = page.getByRole("textbox", { name: "Date & Time" });
    this.editNotesInput = page.getByRole("textbox", { name: "Notes" });
    this.statusSelect = page.getByLabel("Status");
    this.saveChangesBt = page.getByRole("button", { name: "Save changes" });
  }

  //Dynamic locators
  option(name: string): Locator {
    return this.page.getByRole("option", { name });
  }

  dateCell(name: string): Locator {
    return this.page.getByRole("gridcell", { name });
  }

  appointmentRow(name: string): Locator {
    return this.page.getByRole("row", { name });
  }

  editAppointmentBt(row: Locator, patientName: string): Locator {
    return row.getByLabel(`Edit appointment for ${patientName}`);
  }
}
