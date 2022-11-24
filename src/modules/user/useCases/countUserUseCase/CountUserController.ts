import { FastifyReply, FastifyRequest } from "fastify";
import { CountUserUseCase } from "./CountUserUseCase";

export class CountUserController {
  constructor(private countUserUseCase: CountUserUseCase) { }

  async handle(_request: FastifyRequest, _reply: FastifyReply) {
    const count = await this.countUserUseCase.execute();

    return { count };
  }
}
