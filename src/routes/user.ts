import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma';
import { countUserController } from "../modules/user/useCases/countUserUseCase";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users/count', async (request, reply) => countUserController.handle(request, reply));

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
