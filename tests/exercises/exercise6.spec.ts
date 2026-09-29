import { test, expect } from "@playwright/test";

/*
  Create a new patient using the patient API.
  1. Get a token from the token service
  2. Store the token in a variable
  3. Use that token in `/auth/register` from patient API

  Hints: 
  - All endpoints, users and password have already been provided
  - Token service expects these key/value pairs in the content-type `application/x-www-form-urlencoded`
  | Key             | Value                               |
  | --------------- | ----------------------------------- | 
  | `grant_type`    | `password`                          |
  | `client_id`     | `api-service-client`                |
  | `client_secret` | `api_service_secret_change_in_prod` |
  | `username`      | `dr.smith@clinic.local`             |
  | `password`      | `Staff1234!`                        |
  | `scope`         | `openid`                            |

  - Patient API Swagger: http://localhost:3001/api/docs#/
  - Use AI or console.log if you're stuck
*/

const tokenUrl = "http://localhost:8180/realms/clinic/protocol/openid-connect/token";
const apiUrl = "http://localhost:3001/api";

const client_id = "";
const client_secret = "";
const username = "";
const password = "";

test("Get Access Token and Register Patient", async ({ request }) => {
  let access_token: string;

  await test.step("Get token", async () => {
    const response = await request.post(tokenUrl, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams({}).toString(),
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    access_token = body.access_token;
    expect(access_token).toBeDefined();
  });

  await test.step("Register new patient", async () => {});
});
