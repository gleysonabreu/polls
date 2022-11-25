import { FastifyReply, FastifyRequest } from "fastify";
import { CountPollsUseCase } from "./count-polls-use-case";

export class CountPollsController {
  constructor(private countPollsUseCase: CountPollsUseCase) { }

  async handle(_request: FastifyRequest, _reply: FastifyReply) {
    const count = await this.countPollsUseCase.execute();

    return { count };
  }
}
