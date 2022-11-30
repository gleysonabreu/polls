import { User, Game, Guess } from "@prisma/client";

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

export type GetGameGuessesProps = {
  pollId: string;
  gameId: string;
}

export type ReturnGetGameGuesses = (Game & {
  guesses: (Guess & {
    participant: {
      user: User;
    };
  })[];
}) | null;

export interface GamesRepository {
  findById: (id: string) => Promise<Game | null>;
  getGameGuesses: (data: GetGameGuessesProps) => Promise<ReturnGetGameGuesses>;
  getGamesWithPagination: (data: GamesWithPaginationProps) => Promise<GamesWithPaginationReturn>;
}
