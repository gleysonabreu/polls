import { faker } from '@faker-js/faker';

import { GamesRepository } from "../../../../modules/game/repositories/games-repository";
import { GamesWithPaginationUseCase } from "./games-with-pagination-use-case";
import { GamesWithPaginationController } from "./games-with-pagination-controller";
import { GamesRepositoryInMemory } from "../../../../modules/game/repositories/games-repository-inmemory";

import { mockGame } from '../../../../../tests/mock-game';

const mockGamesWithPagination = (): GamesWithPaginationController.Request => ({
  id: faker.datatype.uuid(),
  perPage: '2',
  page: '1',
  userId: faker.datatype.uuid(),
});

type SutTypes = {
  sut: GamesWithPaginationUseCase;
  gamesRepository: GamesRepository;
}

const makeSut = (): SutTypes => {
  const gamesRepository = new GamesRepositoryInMemory();
  const sut = new GamesWithPaginationUseCase(gamesRepository);
  return { gamesRepository, sut };
}

describe('Games With Pagination Use Case', () => {
  it('should be able to get games', async () => {
    const { gamesRepository, sut } = makeSut();

    const createGame = mockGame();
    await gamesRepository.create(createGame);

    const params = mockGamesWithPagination();
    const { games, total } = await sut.execute(params);

    expect(total).toBe(1);
    expect(games).toEqual([{
      id: createGame.id,
      guess: null,
      guesses: undefined,
      date: createGame.date,
      firstTeamCountryCode: createGame.firstTeamCountryCode,
      secondTeamCountryCode: createGame.secondTeamCountryCode,
      firstTeamScore: createGame.firstTeamScore,
      secondTeamScore: createGame.secondTeamScore,
    }]);
  });

  it('should be able to get games without page and perPage', async () => {
    const { gamesRepository, sut } = makeSut();
    const createGame = mockGame();
    await gamesRepository.create(createGame);

    const params = mockGamesWithPagination();
    params.page = undefined;
    params.perPage = undefined;

    const { games, total } = await sut.execute(params);
    expect(total).toBe(1);
    expect(games).toEqual([{
      id: createGame.id,
      guess: null,
      guesses: undefined,
      date: createGame.date,
      firstTeamCountryCode: createGame.firstTeamCountryCode,
      secondTeamCountryCode: createGame.secondTeamCountryCode,
      firstTeamScore: createGame.firstTeamScore,
      secondTeamScore: createGame.secondTeamScore,
    }]);
  });

  it('should not be able to get games if no id', async () => {
    const { sut } = makeSut();
    const params = mockGamesWithPagination();
    params.id = '';

    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow();
  });
});
