import { Game } from '@prisma/client';
import { prisma } from '../../../../../lib/prisma';
import { GamesRepository, GamesWithPaginationProps, GamesWithPaginationReturn, GetGameGuessesProps, ReturnGetGameGuesses } from "../../../repositories/games-repository";

export class GamesRepositoryPrisma implements GamesRepository {
  async findById(id: string): Promise<Game | null> {
    return prisma.game.findUnique({
      where: {
        id,
      }
    });
  };

  async getGameGuesses({ gameId, pollId }: GetGameGuessesProps): Promise<ReturnGetGameGuesses> {
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

  async getGamesWithPagination({ skip, take, pollId, userId }: GamesWithPaginationProps): Promise<GamesWithPaginationReturn> {
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
