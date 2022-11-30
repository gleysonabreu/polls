import { Controller } from "../../../../protocols/controller";
import { GamesRepositoryPrisma } from "../../infra/prisma/repositories/games-repository-prisma";
import { GetGameGuessesController } from "./get-game-guesses-controller";
import { GetGameGuessesUseCase } from "./get-game-guesses-use-case";

export const makeGetGameGuessesController = (): Controller => {
  const gamesRepository = new GamesRepositoryPrisma();
  const getGameGuessesUseCase = new GetGameGuessesUseCase(gamesRepository);
  const controller = new GetGameGuessesController(getGameGuessesUseCase);
  return controller;
}

