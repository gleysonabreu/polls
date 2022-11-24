import { User } from "@prisma/client";

export type GetHomepageProps = {
  id: string;
  avatarUrl: string | null;
}

export type CreateUser = {
  email: string;
  googleId: string;
  name: string;
  avatarUrl: string | null;
}

export interface IUsersRepository {
  findByGoogleId: (id: string) => Promise<User | null>;
  create: (user: CreateUser) => Promise<User>;
  count: () => Promise<number>;
  getHomepage: () => Promise<GetHomepageProps[]>;
}
