import { Auth } from "../auth";

export class GoogleProvider implements Auth {
  async getUser(access_token: string): Promise<any> {
    const userResponse = await fetch(process.env.GOOGLE_APIS_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    return await userResponse.json();
  };
}
