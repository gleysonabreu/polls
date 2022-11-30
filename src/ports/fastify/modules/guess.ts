import { makeGetGameGuessesController } from "../../../modules/game/useCases/getGameGuesses";
import { countGuessesController } from "../../../modules/guess/useCases/countGuesses";
import { createGuessController } from "../../../modules/guess/useCases/createGuess";
import { CreateGuessControllerProps } from "../../../modules/guess/useCases/createGuess/create-guess-controller";
import { authenticate } from "../../../plugins/authenticate";
import { adaptRoute } from "../fastify-route-adapter";
import { app } from "../server";

app
  .get('/api/v1/guesses/count',
    async (request, reply) => countGuessesController.handle(request, reply));

app
  .get('/api/v1/polls/:pollId/games/:gameId/guesses',
    { onRequest: [authenticate] },
    adaptRoute(makeGetGameGuessesController())
  );

app
  .post<CreateGuessControllerProps>('/api/v1/polls/:pollId/games/:gameId/guesses',
    { onRequest: [authenticate] },
    async (request, reply) => createGuessController.handle(request, reply));
