import { createUserController } from "../../../modules/user/useCases/createUser";
import { CreateUserProps } from "../../../modules/user/useCases/createUser/CreateUserController";
import { authenticate } from "../../../plugins/authenticate";
import { app } from '../server';

app
  .get('/api/v1/me',
    { onRequest: [authenticate] },
    async (req, _reply) => { return { user: req.user } });

app
  .post<CreateUserProps>('/api/v1/users',
    async (request, reply) => createUserController.handle(request, reply, app));
