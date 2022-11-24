import { User } from '@prisma/client';
import { prisma } from '../../../../../lib/prisma';
import { CreateUser, GetHomepageProps, IUsersRepository } from "../../../repositories/IUsersRepository";

export class UsersRepositoryPrisma implements IUsersRepository {
  async create({ name, email, googleId, avatarUrl }: CreateUser): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        googleId,
        name,
        avatarUrl,
      }
    });

    return user;
  };

  async findByGoogleId(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        googleId: id,
      }
    });

    return user;
  };

  async count(): Promise<number> {
    const count = await prisma.user.count();
    return count;
  };

  async getHomepage(): Promise<GetHomepageProps[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        avatarUrl: true,
      },
      take: 4,
    });

    return users;
  };
}
