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

  //Routes
  async mockGetAppointments(): Promise<void> {
    await this.page.route("**/api/appointments?*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(getAppointmentsResponse),
      });
    });
  }

  async mockPostAppointment(): Promise<void> {
    await this.page.route("**/api/appointments", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(createAppointmentResponse),
      });
    });
  }
}

const createAppointmentResponse = {
  data: {
    id: "99380f5a-6647-47bf-b40b-718e54a22196",
    patientId: "e254f02d-0e79-4808-8a92-8e0e93ce7d41",
    doctorId: "d0f45f80-1d6a-43ff-9cbf-1e36ba1c8a5c",
    assistantId: "7a1c536e-dd31-4c01-86dd-ab2f2ee1817e",
    scheduledAt: "2027-12-31T07:00:00.000Z",
    status: "SCHEDULED",
    notes: "",
    createdAt: "2027-01-01T07:06:51.656Z",
    updatedAt: "2027-01-01T07:06:51.656Z",
    patient: {
      id: "e254f02d-0e79-4808-8a92-8e0e93ce7d41",
      userId: "d41dc228-c199-4751-b611-91e97ee401ac",
      dateOfBirth: "1985-03-15",
      phone: "+31 6 12345678",
      insuranceNumber: "INS-2024-003",
      photo: "data:image/png;base64,ABC",
      emailNotificationsEnabled: true,
      updatedAt: "2026-09-29T06:53:41.768Z",
      user: {
        id: "d41dc228-c199-4751-b611-91e97ee401ac",
        keycloakId: "43ab6bac-bced-485f-9183-a1ae10e8197d",
        email: "patient.wilson@example.com",
        firstName: "Quality",
        lastName: "At Speed",
        role: "patient",
        createdAt: "2027-01-01T09:43:38.434Z",
        updatedAt: "2027-01-01T06:53:41.768Z",
        deletedAt: null,
      },
    },
    doctor: {
      id: "d0f45f80-1d6a-43ff-9cbf-1e36ba1c8a5c",
      userId: "85bc67da-426b-4813-94ff-1293bac5e11b",
      specialization: "General Practice",
      licenseNumber: "GP-001-2024",
      updatedAt: "2026-09-28T09:43:38.416Z",
      user: {
        id: "85bc67da-426b-4813-94ff-1293bac5e11b",
        keycloakId: "8738c3ea-5058-4777-9b1f-0ada9f37691f",
        email: "dr.smith@clinic.local",
        firstName: "Quality",
        lastName: "Speed",
        role: "doctor",
        createdAt: "2026-09-28T09:43:38.416Z",
        updatedAt: "2026-09-29T06:53:41.749Z",
        deletedAt: null,
      },
    },
    assistant: {
      id: "7a1c536e-dd31-4c01-86dd-ab2f2ee1817e",
      userId: "d6dbdc1e-9c53-4f1f-9ad1-f160ea13429f",
      department: "Reception",
      updatedAt: "2026-09-28T09:43:38.422Z",
      user: {
        id: "d6dbdc1e-9c53-4f1f-9ad1-f160ea13429f",
        keycloakId: "b8800749-85c7-4c6d-ba92-6cc7c1816c1b",
        email: "assistant.brown@clinic.local",
        firstName: "Emily",
        lastName: "Brown",
        role: "assistant",
        createdAt: "2026-09-28T09:43:38.422Z",
        updatedAt: "2026-09-29T06:53:41.757Z",
        deletedAt: null,
      },
    },
  },
  message: "Appointment created",
};

const getAppointmentsResponse = {
  data: [createAppointmentResponse.data],
  message: "Appointments retrieved",
};
