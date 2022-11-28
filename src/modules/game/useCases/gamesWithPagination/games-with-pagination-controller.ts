import { FastifyReply, FastifyRequest } from "fastify";
import { GamesWithPaginationUseCase } from "./games-with-pagination-use-case";

export type RequestGamesPaginationProps = {
  Params: {
    id: string;
  };
  Querystring: {
    page?: string;
    perPage?: string;
  }
}

export class GamesWithPaginationController {
  constructor(private gamesWithPaginationUseCase: GamesWithPaginationUseCase) { }

  async handle(request: FastifyRequest<RequestGamesPaginationProps>, reply: FastifyReply) {
    const { id } = request.params;
    const { perPage, page } = request.query;

    const { games, total } = await this.gamesWithPaginationUseCase.execute({
      id,
      userId: request.user.sub,
      page,
      perPage
    });

    reply.headers({ 'x-total-count': total });
    return {
      games,
    };
  }
}
