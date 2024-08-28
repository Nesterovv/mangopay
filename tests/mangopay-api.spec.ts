import { test, expect } from "./fixtures/auth-fixture";
import dotenv from "dotenv";
import userData from "./data/user-data.json";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;

test.describe("Mangopay API Tests", () => {
  let userId: string;
  let walletId: string;

  test("AC1: Create a new user", async ({ authenticatedRequest }) => {
    const response = await authenticatedRequest.post(
      `/v2.01/${CLIENT_ID}/users/natural`,
      {
        data: {
          FirstName: userData.users[0].firstName,
          LastName: userData.users[0].lastName,
          Birthday: userData.users[0].birthday,
          Nationality: userData.users[0].nationality,
          CountryOfResidence: userData.users[0].countryOfResidence,
          Email: userData.users[0].email,
        },
      }
    );
    console.log("Response status:", response.status());
    const responseBody = await response.json();
    console.log("Response body:", responseBody);

    expect(response.status(), "Expected a 200 OK response").toBe(200);

    expect(
      responseBody.Id,
      "Expected user Id to be defined in the response"
    ).toBeDefined();

    userId = responseBody.Id;
    console.log("Created user ID:", userId);
  });
});
