import { User } from '../entities/user';
import { CreateUser, GetHomePage } from './types';
import { UsersRepository } from './users-repository';

export class UsersRepositoryInMemory implements UsersRepository {
  private users: User[] = [];

  async count(): Promise<number> {
    return this.users.length;
  }
  async create(user: CreateUser): Promise<User> {
    throw new Error('Implement create method');
  };
  async findByGoogleId(id: string): Promise<User | null> {
    throw new Error('Implement findByGoogleId method');
  };
  async getHomepage(): Promise<GetHomePage[]> {
    throw new Error('Implement getHomepage method');
  };
}
