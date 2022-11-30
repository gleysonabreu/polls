import { GuessesRepository } from "../../../repositories/guesses-repository";
import { prisma } from '../../../../../lib/prisma';

export class GuessesRepositoryPrisma implements GuessesRepository {
  async count(): Promise<number> {
    return prisma.guess.count();
  };
}
