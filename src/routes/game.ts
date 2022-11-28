import { FastifyInstance } from "fastify";
import { gamesWithPaginationController } from "../modules/game/useCases/gamesWithPagination";
import { RequestGamesPaginationProps } from "../modules/game/useCases/gamesWithPagination/games-with-pagination-controller";
import { authenticate } from "../plugins/authenticate";

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get<RequestGamesPaginationProps>('/polls/:id/games', { onRequest: [authenticate] }, async (request, reply) => gamesWithPaginationController.handle(request, reply));
}
