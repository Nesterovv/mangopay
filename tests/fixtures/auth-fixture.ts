import { test as base, expect, APIRequestContext } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

type AuthFixtures = {
  authenticatedRequest: APIRequestContext;
};

export const test = base.extend<AuthFixtures>({
  authenticatedRequest: async ({ playwright, baseURL }, use) => {
    const CLIENT_ID = process.env.CLIENT_ID;
    const API_KEY = process.env.API_KEY;

    const credentials = `${CLIENT_ID}:${API_KEY}`;
    const encodedCredentials = Buffer.from(credentials).toString("base64");
    const authHeader = `Basic ${encodedCredentials}`;

    const requestContext = await playwright.request.newContext({
      baseURL: baseURL,
      extraHTTPHeaders: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const tokenResponse = await requestContext.post("/v2.01/oauth/token", {
      form: {
        grant_type: "client_credentials",
      },
    });

    const tokenData = await tokenResponse.json();

    if (tokenResponse.status() !== 200) {
      console.error("Failed to obtain OAuth token:", tokenData);
      throw new Error(
        `Failed to obtain OAuth token: ${
          tokenData.error || tokenData.error_description || tokenData.Message
        }`
      );
    }

    const accessToken = tokenData.access_token;

    const authenticatedContext = await playwright.request.newContext({
      baseURL: baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    await use(authenticatedContext);

    await requestContext.dispose();
    await authenticatedContext.dispose();
  },
});

export { expect };
