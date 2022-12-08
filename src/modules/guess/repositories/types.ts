import { Guess } from '../entities/guess';

export type CreateGuess = Omit<Guess, 'createdAt'>;
