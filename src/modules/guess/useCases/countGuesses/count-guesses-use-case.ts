import { GuessesRepository } from "../../repositories/guesses-repository";

export class CountGuessesUseCase {
  constructor(private guessesRepository: GuessesRepository) { }

  async execute() {
    return this.guessesRepository.count();
  }
}
