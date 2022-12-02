import { Guess } from '../entities/guess';
import { CreateGuess } from './types';

export interface GuessesRepository {
  create: (data: CreateGuess) => Promise<Guess>;
  findGuessByGameIdAndParticipantId: (gameId: string, participantId: string) => Promise<Guess | null>;
  count: () => Promise<number>;
}
