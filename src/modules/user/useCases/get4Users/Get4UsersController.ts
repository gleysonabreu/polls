import { FastifyReply, FastifyRequest } from "fastify";
import { Get4UsersUseCase } from "./Get4UsersUseCase";

export class Get4UsersController {
  constructor(private get4UsersUseCase: Get4UsersUseCase) { }

  async handle(_request: FastifyRequest, _reply: FastifyReply) {
    const users = await this.get4UsersUseCase.execute();
    return { users };
  }
}
