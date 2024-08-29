import { APIRequestContext } from '@playwright/test';

export class UserPage {
  private request: APIRequestContext;
  private clientId: string;

  constructor(request: APIRequestContext, clientId: string) {
    this.request = request;
    this.clientId = clientId;
  }

  async createUser(userData: any): Promise<string | null> {
    const response = await this.request.post(`/v2.01/${this.clientId}/users/natural`, {
      data: {
        FirstName: userData.firstName,
        LastName: userData.lastName,
        Birthday: userData.birthday,
        Nationality: userData.nationality,
        CountryOfResidence: userData.countryOfResidence,
        Email: userData.email,
      },
    });

    if (response.status() !== 200) {
      console.error('Failed to create user:', await response.json());
      return null;
    }

    const responseBody = await response.json();
    console.log('Created user response:', responseBody);
    return responseBody.Id;
  }
}
