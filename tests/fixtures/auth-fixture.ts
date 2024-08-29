// fixtures/auth-fixture.ts
import { test as base, expect, APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

// Define the types for your fixtures
type AuthFixtures = {
  authenticatedRequest: APIRequestContext;  // Authenticated API request context
};

// Extend the base test with both "userID" and "authenticatedRequest" fixtures.
export const test = base.extend<AuthFixtures>({
  // Fixture to provide authenticated request context
  authenticatedRequest: async ({ playwright, baseURL }, use) => {
    const CLIENT_ID = process.env.CLIENT_ID;
    const API_KEY = process.env.API_KEY;

    const credentials = `${CLIENT_ID}:${API_KEY}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    const authHeader = `Basic ${encodedCredentials}`;

    // Create a new request context for token retrieval
    const requestContext = await playwright.request.newContext({
      baseURL: baseURL,
      extraHTTPHeaders: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Obtain OAuth token
    const tokenResponse = await requestContext.post('/v2.01/oauth/token', {
      form: {
        grant_type: 'client_credentials',
      },
    });

    const tokenData = await tokenResponse.json();

    if (tokenResponse.status() !== 200) {
      console.error('Failed to obtain OAuth token:', tokenData);
      throw new Error(
        `Failed to obtain OAuth token: ${
          tokenData.error || tokenData.error_description || tokenData.Message
        }`
      );
    }

    const accessToken = tokenData.access_token;

    // Create a new request context with the obtained token
    const authenticatedContext = await playwright.request.newContext({
      baseURL: baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    await use(authenticatedContext);  // Provide the authenticated context to tests

    // Clean up after tests
    await requestContext.dispose();
    await authenticatedContext.dispose();
  },
});

export { expect };

