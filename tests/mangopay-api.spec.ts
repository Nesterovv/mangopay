import { test, expect } from "./fixtures/auth-fixture";
import dotenv from "dotenv";
import userData from "./data/user-data.json";
import { writeDataToFile, readDataFromFile } from "./utils/storage-utils";
import { UserPage } from "../Api/UserPage";
import { WalletPage } from "../Api/WalletPage";
import wallets from "./data/walletData.json";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID!;
let userID: string;
let walletID: string;

test.describe("Mangopay API Tests", () => {
  test.beforeEach(async ({ authenticatedRequest }) => {
    const userPage = new UserPage(authenticatedRequest, CLIENT_ID);
    const walletPage = new WalletPage(authenticatedRequest, CLIENT_ID);
  });

  test("AC1: Create a new user", async ({ authenticatedRequest }) => {
    const userPage = new UserPage(authenticatedRequest, CLIENT_ID);

    userID = (await userPage.createUser(userData.users[0])) as string;
    expect(userID).toBeDefined();
    console.log("Created user ID:", userID);

    wallets.wallets[0].Owners = [userID];
    writeDataToFile(wallets, "walletData");
  });

  test("AC2: Create a new wallet", async ({ authenticatedRequest }) => {
    const walletPage = new WalletPage(authenticatedRequest, CLIENT_ID);

    const updatedWalletData = readDataFromFile("walletData");
    expect(updatedWalletData).toBeTruthy();

    walletID = (await walletPage.createWallet(
      userID,
      updatedWalletData.wallets[0]
    )) as string;
    expect(walletID).toBeDefined();
    console.log("Created wallet ID:", walletID);
  });
});
