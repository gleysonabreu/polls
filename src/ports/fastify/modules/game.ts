import { makeGamesWithPaginationController } from "../../../modules/game/useCases/gamesWithPagination";
import { authenticate } from "../../../plugins/authenticate";
import { adaptRoute } from "../fastify-route-adapter";
import { app } from "../server";

app
  .get('/api/v1/polls/:id/games',
    { onRequest: [authenticate] },
    adaptRoute(makeGamesWithPaginationController())
  );
