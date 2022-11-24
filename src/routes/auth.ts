import { FastifyInstance } from "fastify";
import { createUserController } from "../modules/user/useCases/createUser";
import { CreateUserProps } from "../modules/user/useCases/createUser/CreateUserController";
import { authenticate } from "../plugins/authenticate";



export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/me', { onRequest: [authenticate] }, async (req, _reply) => {
    return { user: req.user };
  });

  fastify.post<CreateUserProps>('/users', async (request, reply) => createUserController.handle(request, reply, fastify));
}
