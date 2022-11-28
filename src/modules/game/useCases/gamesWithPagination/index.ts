import { GamesRepositoryPrisma } from "../../infra/prisma/repositories/games-repository-prisma";
import { GamesWithPaginationController } from "./games-with-pagination-controller";
import { GamesWithPaginationUseCase } from "./games-with-pagination-use-case";

const gamesRepository = new GamesRepositoryPrisma();
const gamesWithPaginationUseCase = new GamesWithPaginationUseCase(gamesRepository);
const gamesWithPaginationController = new GamesWithPaginationController(gamesWithPaginationUseCase);

export { gamesWithPaginationController };
