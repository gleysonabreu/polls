import { Guess } from '../entities/guess';

export type CreateGuessProps = Omit<Guess, 'id' | 'createdAt'>

export interface GuessesRepository {
  create: (data: CreateGuessProps) => Promise<Guess>;
  findGuessByGameIdAndParticipantId: (gameId: string, participantId: string) => Promise<Guess | null>;
  count: () => Promise<number>;
}
