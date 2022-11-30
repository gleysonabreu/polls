import { FastifyReply, FastifyRequest } from "fastify";
import { GetGameGuessesUseCase } from "./get-game-guesses-use-case";

export type GetGameGuessesControllerProps = {
  Params: {
    pollId: string;
    gameId: string;
  }
}

export class GetGameGuessesController {
  constructor(private getGameGuessesUseCase: GetGameGuessesUseCase) { }

  async handle(request: FastifyRequest<GetGameGuessesControllerProps>, _reply: FastifyReply) {
    const { gameId, pollId } = request.params;

    const game = await this.getGameGuessesUseCase.execute({ pollId, gameId });
    return { game };
  }
}
