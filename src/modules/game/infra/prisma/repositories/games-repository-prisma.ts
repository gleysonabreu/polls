import { prisma } from '../../../../../lib/prisma';
import { GamesRepository, GamesWithPaginationProps, GamesWithPaginationReturn } from "../../../repositories/games-repository";

export class GamesRepositoryPrisma implements GamesRepository {
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
