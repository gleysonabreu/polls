import { GamesRepositoryPrisma } from "../../../game/infra/prisma/repositories/games-repository-prisma";
import { ParticipantsRepositoryPrisma } from "../../../participant/infra/prisma/repositories/participants-repository-prisma";
import { GuessesRepositoryPrisma } from "../../infra/prisma/repositories/guesses-repository-prisma";
import { CreateGuessController } from "./create-guess-controller";
import { CreateGuessUseCase } from "./create-guess-use-case";

const gamesRepository = new GamesRepositoryPrisma();
const participantsRepository = new ParticipantsRepositoryPrisma();
const guessesRepository = new GuessesRepositoryPrisma();
const createGuessUseCase = new CreateGuessUseCase(guessesRepository, participantsRepository, gamesRepository);
const createGuessController = new CreateGuessController(createGuessUseCase);


export { createGuessController };
