import { faker } from "@faker-js/faker";
import { GamesRepository } from "../../../../modules/game/repositories/games-repository";
import { GamesRepositoryInMemory } from "../../../../modules/game/repositories/games-repository-inmemory";
import { GetGameGuessesController } from "./get-game-guesses-controller";
import { GetGameGuessesUseCase } from "./get-game-guesses-use-case";

type SutTypes = {
  gamesRepository: GamesRepository;
  sut: GetGameGuessesUseCase;
}

const makeSut = (): SutTypes => {
  const gamesRepository = new GamesRepositoryInMemory();
  const sut = new GetGameGuessesUseCase(gamesRepository);

  return { gamesRepository, sut };
}

const mockGetGameGuesses = (): GetGameGuessesController.Request => ({
  gameId: faker.datatype.uuid(),
  pollId: faker.datatype.uuid(),
});

describe('Get Games Guesses Use Case', () => {
  it('should be able to return game guesses', async () => {
    const { sut } = makeSut();

    const params = mockGetGameGuesses();
    const result = await sut.execute(params);

    expect(result).toHaveProperty('game');
    expect(result.game).toHaveProperty('id');
    expect(result.game?.id).toEqual(params.gameId);
  });

  it('should not return game guesses if no pollId', async () => {
    const { sut } = makeSut();
    const params = mockGetGameGuesses();
    params.pollId = '';

    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow();
  });

  it('should not return game guesses if no gameId', async () => {
    const { sut } = makeSut();
    const params = mockGetGameGuesses();
    params.gameId = '';

    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow();
  });
});
