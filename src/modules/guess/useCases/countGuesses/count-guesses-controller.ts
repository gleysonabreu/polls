import { FastifyReply, FastifyRequest } from "fastify";
import { CountGuessesUseCase } from "./count-guesses-use-case";

export class CountGuessesController {
  constructor(private countGuessesUseCase: CountGuessesUseCase) { }

  async handle(_request: FastifyRequest, _reply: FastifyReply) {
    const count = await this.countGuessesUseCase.execute();

    return { count };
  }
}
