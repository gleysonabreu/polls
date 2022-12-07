import { GuessesRepositoryInMemory } from "../../../../modules/guess/repositories/guesseses-repository-inmemory";
import { GuessesRepository } from "../../../../modules/guess/repositories/guesses-repository";
import { CountGuessesUseCase } from "./count-guesses-use-case";

type SutTypes = {
  sut: CountGuessesUseCase;
  guessesRepository: GuessesRepository;
}

const makeSut = (): SutTypes => {
  const guessesRepository = new GuessesRepositoryInMemory();
  const sut = new CountGuessesUseCase(guessesRepository);

  return { sut, guessesRepository };
}

describe('Count Guess Use Case', () => {
  it('should be able get total guesses', async () => {
    const { sut } = makeSut();
    const count = await sut.execute();

    expect(count).toEqual(0);
  });
});
