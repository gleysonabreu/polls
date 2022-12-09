export interface Auth {
  getUser: (access_token: string) => Promise<any>;
}
