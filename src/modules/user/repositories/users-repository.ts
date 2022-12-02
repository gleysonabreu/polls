import { User } from '../entities/user';

export type GetHomepageProps = {
  id: string;
  avatarUrl: string | null;
}

export type CreateUser = Omit<User, 'id' | 'createdAt'>

export interface UsersRepository {
  findByGoogleId: (id: string) => Promise<User | null>;
  create: (user: CreateUser) => Promise<User>;
  count: () => Promise<number>;
  getHomepage: () => Promise<GetHomepageProps[]>;
}
