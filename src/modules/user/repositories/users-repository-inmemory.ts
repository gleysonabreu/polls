import { User } from '../entities/user';
import { CreateUser, GetHomePage } from './types';
import { UsersRepository } from './users-repository';

export class UsersRepositoryInMemory implements UsersRepository {
  private users: User[] = [];

  async count(): Promise<number> {
    return this.users.length;
  }
  async create(user: CreateUser): Promise<User> {
    const data = { ...user, id: user.id as string, createdAt: new Date() };
    this.users.push(data);
    return data;
  };
  async findByGoogleId(id: string): Promise<User | null> {
    throw new Error('Implement findByGoogleId method');
  };
  async getHomepage(): Promise<GetHomePage[]> {
    return this.users.slice(0, 4);
  };
}
