import { Guess } from "../entities/guess";
import { GuessesRepository } from "./guesses-repository";
import { CreateGuess } from "./types";

export class GuessesRepositoryInMemory implements GuessesRepository {
  private guesses: Guess[] = [];
  async count(): Promise<number> {
    return this.guesses.length;
  };

  async create(data: CreateGuess): Promise<Guess> {
    const guess = { ...data, createdAt: new Date() }
    this.guesses.push(guess);

    return guess;
  };

  async findGuessByGameIdAndParticipantId(gameId: string, participantId: string): Promise<Guess | null> {
    const guess = this.guesses.find(guess => guess.gameId === gameId && guess.participantId === participantId);

    if (guess) {
      return guess;
    } else {
      return null;
    }
  };
}
