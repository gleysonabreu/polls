import { FastifyReply, FastifyRequest } from "fastify";
import { CreateGuessUseCase } from "./create-guess-use-case";

export type CreateGuessControllerProps = {
  Params: {
    pollId: string;
    gameId: string;
  };
  Body: {
    firstTeamPoints: number;
    secondTeamPoints: number;
  }
};

export class CreateGuessController {
  constructor(private createGuessUseCase: CreateGuessUseCase) { }

  async handle(request: FastifyRequest<CreateGuessControllerProps>, reply: FastifyReply) {
    const { gameId, pollId } = request.params;
    const { firstTeamPoints, secondTeamPoints } = request.body;

    const guess = await this.createGuessUseCase.execute({
      secondTeamPoints,
      firstTeamPoints,
      pollId,
      gameId,
      userId: request.user.sub,
    });

    return reply.status(201).send(guess);
  }
}
