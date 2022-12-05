import { User } from '../entities/user';
import { CreateUser, GetHomePage } from './types';

export interface UsersRepository {
  findByGoogleId: (id: string) => Promise<User | null>;
  create: (user: CreateUser) => Promise<User>;
  count: () => Promise<number>;
  getHomepage: () => Promise<GetHomePage[]>;
}
