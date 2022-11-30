import { FastifyInstance } from "fastify";
import { countUserController } from "../modules/user/useCases/countUserUseCase";
import { get4UsersController } from "../modules/user/useCases/get4Users";

export async function userRoutes(fastify: FastifyInstance) {
  fastify
    .get('/users/count',
      async (request, reply) => countUserController.handle(request, reply));

  fastify
    .get('/users/homepage',
      async (request, reply) => get4UsersController.handle(request, reply));
}
