
# Mangopay API Tests with Playwright

This repository contains automated API tests for Mangopay using Playwright. The tests are designed to verify user and wallet-related functionalities via the Mangopay API.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Test Structure](#test-structure)
- [Running the Tests](#running-the-tests)
- [Parallel Execution](#parallel-execution)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before setting up the project, ensure you have the following software installed:

- [Node.js (version 14 or later)](https://nodejs.org/)
- [npm (Node Package Manager)](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/nesterovv/mangopay-api-tests.git
   cd mangopay-api-tests
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   Or, if you prefer using Yarn:

   ```bash
   yarn install
   ```

## Environment Setup

1. **Create a `.env` file** in the root directory to store your environment variables:

   ```bash
   touch .env
   ```

2. **Add the following variables to your `.env` file**:

   ```plaintext
   CLIENT_ID=your_mangopay_client_id
   API_KEY=your_mangopay_api_key
   ```

   Replace `your_mangopay_client_id` and `your_mangopay_api_key` with your actual Mangopay API credentials.

## Test Structure

- **`fixtures/`**: Contains shared test setup and teardown logic.
- **`pages/`**: Implements the Page Object Model (POM) pattern to encapsulate API interactions.
  - `UserPage.ts`: Manages user-related API interactions.
  - `WalletPage.ts`: Manages wallet-related API interactions.
- **`tests/`**: Contains all test cases.
  - `mangopay-api-tests.spec.ts`: Main test file for user and wallet management tests.
- **`data/`**: Holds JSON files for test data (`user-data.json`, `walletData.json`).
- **`utils/`**: Contains utility functions for reading and writing JSON data.

## Running the Tests

To run the tests, use the following command:

```bash
npx playwright test
```

Or, if you have Playwright installed globally:

```bash
playwright test
```

### Run Specific Tests

To run a specific test file:

```bash
npx playwright test tests/your-test-file.spec.ts
```

### Run Tests in Headed Mode

To run tests in a visible browser window:

```bash
npx playwright test --headed
```

### Run Tests with Debugging

To debug tests step-by-step:

```bash
npx playwright test --debug
```

## Parallel Execution

Tests are configured to run in parallel to speed up execution time. The number of parallel workers is set in the `playwright.config.ts` file:

```typescript
// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  workers: 2, // Adjust the number of parallel workers based on your machine's capacity
  use: {
    baseURL: 'https://api.sandbox.mangopay.com',
    headless: true,
  }
}
export default config;
```

Adjust the `workers` property according to the number of CPU cores or your preference.

## Troubleshooting

- **Common Issues**:
  - Ensure your Mangopay API credentials are correct in the `.env` file.
  - Verify all dependencies are installed correctly using `npm install` or `yarn install`.
  - Check network connectivity if tests fail due to network-related issues.

- **Useful Commands**:
  - `npx playwright test --reporter=html` - Generates an HTML report for test results.
  - `npx playwright show-report` - Opens the latest HTML report in your default browser.


