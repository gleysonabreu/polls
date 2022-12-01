import { Controller } from "../../../../protocols/controller";
import { GamesRepositoryPrisma } from "../../infra/prisma/repositories/games-repository-prisma";
import { GamesWithPaginationController } from "./games-with-pagination-controller";
import { GamesWithPaginationUseCase } from "./games-with-pagination-use-case";

export const makeGamesWithPaginationController = (): Controller => {
  const gamesRepository = new GamesRepositoryPrisma();
  const gamesWithPaginationUseCase = new GamesWithPaginationUseCase(gamesRepository);
  const gamesWithPaginationController = new GamesWithPaginationController(gamesWithPaginationUseCase);
  return gamesWithPaginationController;
}
