import { gamesWithPaginationController } from "../../../modules/game/useCases/gamesWithPagination";
import { RequestGamesPaginationProps } from "../../../modules/game/useCases/gamesWithPagination/games-with-pagination-controller";
import { authenticate } from "../../../plugins/authenticate";
import { app } from "../server";

app
  .get<RequestGamesPaginationProps>('/api/v1/polls/:id/games',
    { onRequest: [authenticate] },
    async (request, reply) => gamesWithPaginationController.handle(request, reply));
