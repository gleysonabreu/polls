import { Game } from '../entities/game';
import {
  CreateGame,
  GamesWithPagination,
  GamesWithPaginationData,
  GetGameGuesses,
  GetGameGuessesData
} from './types';

export interface GamesRepository {
  findById: (id: string) => Promise<Game | null>;
  getGameGuesses: (data: GetGameGuessesData) => Promise<GetGameGuesses>;
  getGamesWithPagination: (data: GamesWithPaginationData) => Promise<GamesWithPagination>;
  create: (data: CreateGame) => Promise<Game>;
}
