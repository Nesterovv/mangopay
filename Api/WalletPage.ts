import { APIRequestContext } from '@playwright/test';

export class WalletPage {
  private request: APIRequestContext;
  private clientId: string;

  constructor(request: APIRequestContext, clientId: string) {
    this.request = request;
    this.clientId = clientId;
  }

  async createWallet(ownerId: string, walletData: any): Promise<string | null> {
    const response = await this.request.post(`/v2.01/${this.clientId}/wallets`, {
      data: {
        Owners: [ownerId],
        Description: walletData.Description,
        Currency: walletData.Currency,
        Tag: walletData.Tag,
      },
    });

    if (response.status() !== 200) {
      console.error('Failed to create wallet:', await response.json());
      return null;
    }

    const responseBody = await response.json();
    console.log('Created wallet response:', responseBody);
    return responseBody.Id;
  }
}
