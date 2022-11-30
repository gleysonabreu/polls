import { Controller } from "../../../../protocols/controller";
import { GuessesRepositoryPrisma } from "../../infra/prisma/repositories/guesses-repository-prisma";
import { CountGuessesController } from "./count-guesses-controller";
import { CountGuessesUseCase } from "./count-guesses-use-case";

export const makeCountGuessesController = (): Controller => {
  const guessesRepository = new GuessesRepositoryPrisma();
  const countGuessesUseCase = new CountGuessesUseCase(guessesRepository);
  const controller = new CountGuessesController(countGuessesUseCase);
  return controller;
}
