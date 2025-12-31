import { expect, test } from "@playwright/test";
import { URLSearchParams } from "url";

const client_id = "123"; //Change me but don't commit
const client_secret = "abc"; //Change me but don't commit

test("Get Access Token and Create Offer", async ({ request }) => {
  let access_token;
  await test.step("Get Token", async () => {
    const responseToken = await request.post("https://api-tst.nn-group.com/token", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        client_id: client_id,
        client_secret: client_secret,
        grant_type: "client_credentials",
      }).toString(),
    });
    expect(responseToken.ok).toBeTruthy();
    const responeTokenBody = await responseToken.json();
    access_token = responeTokenBody.access_token;
    expect(access_token).toBeDefined();
    console.log(`Access token ${access_token}`);
  });

  await test.step("Create Offer", async () => {
    const responseOffer = await request.post("https://api-tst.nn-group.com/t/nn.nl/income/dvl-offer/v1/offers", {
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
    console.log(responseOffer.status());
    expect(responseOffer.ok).toBeTruthy();
    const responseOfferBody = await responseOffer.json();
    console.log(responseOfferBody);
  });
});
