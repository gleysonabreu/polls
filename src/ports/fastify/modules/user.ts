import { makeCountUserController } from "../../../modules/user/useCases/countUserUseCase";
import { makeGet4UsersController } from "../../../modules/user/useCases/get4Users";
import { adaptRoute } from "../fastify-route-adapter";
import { app } from "../server";

app
  .get('/api/v1/users/count',
    adaptRoute(makeCountUserController())
  );

app
  .get('/api/v1/users/homepage',
    adaptRoute(makeGet4UsersController())
  );
