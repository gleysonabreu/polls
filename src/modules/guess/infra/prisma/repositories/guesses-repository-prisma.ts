import { GuessesRepository } from "../../../repositories/guesses-repository";
import { prisma } from '../../../../../lib/prisma';
import { Guess } from '../../../entities/guess';
import { CreateGuess } from "../../../repositories/types";

export class GuessesRepositoryPrisma implements GuessesRepository {
  async create({ secondTeamPoints, firstTeamPoints, gameId, participantId }: CreateGuess): Promise<Guess> {
    return prisma.guess.create({
      data: {
        firstTeamPoints,
        secondTeamPoints,
        gameId,
        participantId,
      }
    });
  };

  async findGuessByGameIdAndParticipantId(gameId: string, participantId: string): Promise<Guess | null> {
    return prisma.guess.findUnique({
      where: {
        participantId_gameId: {
          gameId,
          participantId,
        }
      }
    });

  };

  async count(): Promise<number> {
    return prisma.guess.count();
  };
}
