import { ok } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { GamesWithPaginationUseCase } from "./games-with-pagination-use-case";

export namespace GamesWithPaginationController {
  export type Request = {
    id: string;
    page?: string;
    perPage?: string;
    userId: string;
  }
}

export class GamesWithPaginationController implements Controller {
  constructor(private gamesWithPaginationUseCase: GamesWithPaginationUseCase) { }

  async handle(request: GamesWithPaginationController.Request) {
    const { id, page, perPage, userId } = request;

    const { games, total } = await this.gamesWithPaginationUseCase.execute({
      id,
      userId,
      page,
      perPage
    });

    const headers = {
      'x-total-count': total,
    };
    return ok({ games }, headers);
  }
}
