import { makeCreateUserController } from "../../../modules/user/useCases/createUser";
import { authenticate } from "../plugins/authenticate";
import { adaptRoute } from "../fastify-route-adapter";
import { app } from '../server';

app
  .get('/api/v1/me',
    { onRequest: [authenticate] },
    async (req, _reply) => { return { user: req.user } });

app
  .post('/api/v1/users',
    adaptRoute(makeCreateUserController())
  );
