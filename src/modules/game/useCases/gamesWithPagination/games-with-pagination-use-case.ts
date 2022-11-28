import { GamesRepository } from "../../repositories/games-repository";
import z from 'zod';

type GamesWithPaginationUseCaseProps = {
  id: string;
  userId: string;
  page?: string;
  perPage?: string;
};

export class GamesWithPaginationUseCase {
  constructor(private gamesRepository: GamesRepository) { }

  async execute({ userId, ...request }: GamesWithPaginationUseCaseProps) {
    const getPollParam = z.object({
      id: z.string(),
    });

    const { id } = getPollParam.parse(request);

    const paginationPollsQuery = z.object({
      page: z.string().optional(),
      perPage: z.string().optional(),
    });

    const { page, perPage } = paginationPollsQuery.parse(request);
    const pageCalc = Number(page || 1) - 1;

    const take = Number(perPage) || 10;
    const skip = pageCalc * take;

    const { games, total } = await this.gamesRepository.getGamesWithPagination({
      userId,
      pollId: id,
      take,
      skip
    });

    const gamesFiltered = games.map(game => {
      return {
        ...game,
        guess: game.guesses.length > 0 ? game.guesses[0] : null,
        guesses: undefined,
      }
    });

    return {
      games: gamesFiltered,
      total,
    };
  }
}
