import { GamesRepositoryPrisma } from "../../infra/prisma/repositories/games-repository-prisma";
import { GetGameGuessesController } from "./get-game-guesses-controller";
import { GetGameGuessesUseCase } from "./get-game-guesses-use-case";

const gamesRepository = new GamesRepositoryPrisma();
const getGameGuessesUseCase = new GetGameGuessesUseCase(gamesRepository);
const getGameGuessesController = new GetGameGuessesController(getGameGuessesUseCase);

export { getGameGuessesController };
