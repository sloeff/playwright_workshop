import { test } from "@playwright/test";
import { URLSearchParams } from "url";

const client_id = "123"; //Change me but don't commit!
const client_secret = "abc"; //Change me but don't commit!

test("Get Access Token and Create Offer", async ({ request }) => {
  let access_token;
  await test.step("Get token", async () => {
    await request.post("", { headers: {}, data: new URLSearchParams({}).toString() });
  });

  await test.step("Create Offer", async () => {
    await request.post("", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        externalIndicative: "propositionRef0001",
        distributionType: "INT",
        effectiveDate: "2024-12-27", //Set to current date
        contractDurationInMonths: 60,
        insuredAmountType: "00021",
        sumInsured: 804.5,
        intermediary: {
          intermediaryId: "311396",
          outputDispatchType: "09",
          contactPerson: {
            surname: "Contactpersoon",
            initials: "A.",
            prefixes: "van der",
            gender: "M",
            email: "email@email.com",
            telephoneNumber: "020-787878",
          },
        },
        policyHolder: {
          tradeRegisterNumber: "90005376",
          employerId: "507336033",
        },
        company: {
          companySpecificType: "1",
          businessSector: "601",
          numberOfPartTimeStaff: 3,
          numberOfFullTimeStaff: 3,
        },
        coverages: [
          {
            productCode: "ARBODIENSTVERLENING",
            executiveOccupationalHealthServicesProvider: "17",
            occupationalHealthServicesPackage: "020",
            coverageMandatory: true,
          },
        ],
        underwritingQuestions: {
          privacyStatementCommunicated: true,
          applicationConfirmedAccordingToInsurerGuidelines: true,
        },
        commonTechnical: {
          senderId: "ZZ11YY",
        },
      },
    });
  });
});
