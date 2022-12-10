import { Auth } from "../src/providers/auth/auth";

export class AuthRepositorySpy implements Auth {
  async getUser(_access_token: string): Promise<any> {
    return true;
  }
}
