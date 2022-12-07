import { GamesRepository } from "./games-repository";
import { Game } from '../entities/game';
import {
  CreateGame,
  GamesWithPagination,
  GamesWithPaginationData,
  GetGameGuesses,
  GetGameGuessesData
} from "./types";

export class GamesRepositoryInMemory implements GamesRepository {
  private games: Game[] = [];

  async findById(id: string): Promise<Game | null> {
    throw new Error('Implementing method');
  };

  async getGameGuesses(data: GetGameGuessesData): Promise<GetGameGuesses> {
    throw new Error('Implementing method');
  };

  async getGamesWithPagination(_data: GamesWithPaginationData): Promise<GamesWithPagination> {
    const games = this.games.map(game => {
      return {
        ...game,
        guesses: [],
      }
    });

    return {
      games,
      total: games.length,
    }
  };

  async create(data: CreateGame): Promise<Game> {
    this.games.push(data);
    return data;
  }
}
