import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "./CreateUserUseCase";

export type CreateUserProps = {
  Body: {
    access_token: string;
  };
}


export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  async handle(request: FastifyRequest<CreateUserProps>, _reply: FastifyReply, fastify: FastifyInstance) {
    const { access_token } = request.body;
    const { user } = await this.createUserUseCase.execute({ access_token });

    const token = fastify.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl,
    }, {
      sub: user.id,
      expiresIn: '1d',
    });

    return { token };
  }
}
