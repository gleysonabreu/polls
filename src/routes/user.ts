import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users/count', async () => {
    const count = await prisma.user.count();
    return {
      count,
    };
  });

  fastify.get('/users/homepage', async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        avatarUrl: true,
      },
      take: 4,
    });
    return {
      users,
    };
  });
}
