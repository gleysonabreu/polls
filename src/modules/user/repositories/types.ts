import { User } from '../entities/user';

export type GetHomePage = {
  id: string;
  avatarUrl: string | null;
}

export type CreateUser = Omit<User, 'id' | 'createdAt'>
