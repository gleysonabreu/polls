import { Game } from '../../../entities/game';
import { prisma } from '../../../../../lib/prisma';
import { GamesRepository } from "../../../repositories/games-repository";
import {
  GamesWithPagination,
  GamesWithPaginationData,
  GetGameGuesses,
  GetGameGuessesData
} from '../../../repositories/types';

export class GamesRepositoryPrisma implements GamesRepository {
  async findById(id: string): Promise<Game | null> {
    return prisma.game.findUnique({
      where: {
        id,
      }
    });
  };

  async getGameGuesses({ gameId, pollId }: GetGameGuessesData): Promise<GetGameGuesses> {
    return prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        guesses: {
          include: {
            participant: {
              select: {
                user: true,
              }
            }
          },
          where: {
            participant: {
              pollId,
            }
          }
        }
      }
    });
  };

  async getGamesWithPagination({ skip, take, pollId, userId }: GamesWithPaginationData): Promise<GamesWithPagination> {
    const [games, allGames] = await prisma.$transaction([
      prisma.game.findMany({
        orderBy: {
          date: 'desc'
        },
        take,
        skip,
        include: {
          guesses: {
            where: {
              participant: {
                userId,
                pollId,
              }
            },
          }
        },
      }),
      prisma.game.findMany({
        include: {
          guesses: {
            where: {
              participant: {
                userId,
                pollId,
              }
            },
          }
        },
      })
    ]);

    return { games, total: allGames.length };
  };
}
