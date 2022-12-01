import { makeGetGameGuessesController } from "../../../modules/game/useCases/getGameGuesses";
import { makeCountGuessesController } from "../../../modules/guess/useCases/countGuesses";
import { makeCreateGuessController } from "../../../modules/guess/useCases/createGuess";
import { authenticate } from "../../../plugins/authenticate";
import { adaptRoute } from "../fastify-route-adapter";
import { app } from "../server";

app
  .get('/api/v1/guesses/count',
    adaptRoute(makeCountGuessesController())
  );

app
  .get('/api/v1/polls/:pollId/games/:gameId/guesses',
    { onRequest: [authenticate] },
    adaptRoute(makeGetGameGuessesController())
  );

app
  .post('/api/v1/polls/:pollId/games/:gameId/guesses',
    { onRequest: [authenticate] },
    adaptRoute(makeCreateGuessController())
  );
