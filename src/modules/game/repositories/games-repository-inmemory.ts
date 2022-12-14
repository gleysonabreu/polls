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
    const game = this.games.find(game => game.id === id);
    if (game) {
      return game;
    } else {
      return null;
    }
  };

  async getGameGuesses(data: GetGameGuessesData): Promise<GetGameGuesses> {
    return {
      id: data.gameId,
    } as GetGameGuesses;
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
