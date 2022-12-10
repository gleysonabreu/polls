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
    const user = this.users.find(user => user.googleId === id);
    if (user) {
      return user;
    } else {
      return null;
    }
  };
  async getHomepage(): Promise<GetHomePage[]> {
    return this.users.slice(0, 4);
  };
}
