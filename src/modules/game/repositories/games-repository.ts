import { Game, Guess } from "@prisma/client";

export type GamesWithPaginationProps = {
  pollId: string;
  userId: string;
  take: number;
  skip: number;
};

export type GamesWithPaginationReturn = {
  games: (Game & { guesses: Guess[] })[];
  total: number;
}

export interface GamesRepository {
  getGamesWithPagination: (data: GamesWithPaginationProps) => Promise<GamesWithPaginationReturn>;
}
