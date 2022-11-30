import { countUserController } from "../../../modules/user/useCases/countUserUseCase";
import { get4UsersController } from "../../../modules/user/useCases/get4Users";
import { app } from "../server";

app
  .get('/api/v1/users/count',
    async (request, reply) => countUserController.handle(request, reply));

app
  .get('/api/v1/users/homepage',
    async (request, reply) => get4UsersController.handle(request, reply));
