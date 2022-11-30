import { GuessesRepositoryPrisma } from "../../infra/prisma/repositories/guesses-repository-prisma";
import { CountGuessesController } from "./count-guesses-controller";
import { CountGuessesUseCase } from "./count-guesses-use-case";

const guessesRepository = new GuessesRepositoryPrisma();
const countGuessesUseCase = new CountGuessesUseCase(guessesRepository);
const countGuessesController = new CountGuessesController(countGuessesUseCase);

export { countGuessesController };
