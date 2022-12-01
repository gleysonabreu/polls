import { makeCountUserController } from "../../../modules/user/useCases/countUserUseCase";
import { get4UsersController } from "../../../modules/user/useCases/get4Users";
import { adaptRoute } from "../fastify-route-adapter";
import { app } from "../server";

app
  .get('/api/v1/users/count',
    adaptRoute(makeCountUserController())
  );

app
  .get('/api/v1/users/homepage',
    async (request, reply) => get4UsersController.handle(request, reply));
