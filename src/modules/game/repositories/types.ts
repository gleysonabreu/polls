import { Game } from '../entities/game';
import { Guess } from '../../guess/entities/guess';
import { User } from '../../user/entities/user';

export type CreateGame = Game;

export type GamesWithPaginationData = {
  pollId: string;
  userId: string;
  take: number;
  skip: number;
};

export type GamesWithPagination = {
  games: (Game & { guesses: Guess[] })[];
  total: number;
}

export type GetGameGuessesData = {
  pollId: string;
  gameId: string;
}

export type GetGameGuesses = (Game & {
  guesses: (Guess & {
    participant: {
      user: User;
    };
  })[];
}) | null;
