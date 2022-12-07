import { Guess } from "../entities/guess";
import { GuessesRepository } from "./guesses-repository";
import { CreateGuess } from "./types";

export class GuessesRepositoryInMemory implements GuessesRepository {
  private guesses: Guess[] = [];
  async count(): Promise<number> {
    return this.guesses.length;
  };

  async create(data: CreateGuess): Promise<Guess> {
    throw new Error('Implement method');
  };

  async findGuessByGameIdAndParticipantId(gameId: string, participantId: string): Promise<Guess | null> {
    throw new Error('Implement method');
  };
}
