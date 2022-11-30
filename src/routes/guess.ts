import { FastifyInstance } from "fastify";
import { getGameGuessesController } from "../modules/game/useCases/getGameGuesses";
import { GetGameGuessesControllerProps } from "../modules/game/useCases/getGameGuesses/get-game-guesses-controller";
import { countGuessesController } from "../modules/guess/useCases/countGuesses";
import { createGuessController } from "../modules/guess/useCases/createGuess";
import { CreateGuessControllerProps } from "../modules/guess/useCases/createGuess/create-guess-controller";
import { authenticate } from "../plugins/authenticate";

export async function guessRoutes(fastify: FastifyInstance) {
  fastify
    .get('/guesses/count',
      async (request, reply) => countGuessesController.handle(request, reply));

  fastify
    .get<GetGameGuessesControllerProps>('/polls/:pollId/games/:gameId/guesses',
      { onRequest: [authenticate] },
      async (request, reply) => getGameGuessesController.handle(request, reply));

  fastify
    .post<CreateGuessControllerProps>('/polls/:pollId/games/:gameId/guesses',
      { onRequest: [authenticate] },
      async (request, reply) => createGuessController.handle(request, reply));
}
