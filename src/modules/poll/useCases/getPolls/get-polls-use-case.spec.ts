import { faker } from "@faker-js/faker";
import { PollsRepository } from "modules/poll/repositories/polls-repository";
import { PollsRepositoryInMemory } from "../../../../modules/poll/repositories/polls-repository-inmemory";
import { GetPollsController } from "./get-polls-controller";
import { GetPollsUseCase } from "./get-polls-use-case";

const mockGetPolls = (): GetPollsController.Request => ({
  userId: faker.datatype.uuid(),
  page: faker.datatype.number().toString(),
  perPage: faker.datatype.number().toString(),
});

type SutTypes = {
  sut: GetPollsUseCase;
  pollsRepository: PollsRepository;
}

const makeSut = (): SutTypes => {
  const pollsRepository = new PollsRepositoryInMemory();
  const sut = new GetPollsUseCase(pollsRepository);

  return { sut, pollsRepository };
}

describe('Get Polls Use Case', () => {
  it('should be able to get polls', async () => {
    const { sut } = makeSut();
    const getPolls = mockGetPolls();

    const { polls, totalPolls } = await sut.execute(getPolls);
    expect(totalPolls).toEqual(0);
    expect(polls).toBeInstanceOf(Array);
  });

  it('should be able to get polls without perPage and page', async () => {
    const { sut } = makeSut();
    const getPolls = mockGetPolls();
    getPolls.page = undefined;
    getPolls.perPage = undefined;

    const { polls, totalPolls } = await sut.execute(getPolls);
    expect(totalPolls).toEqual(0);
    expect(polls).toBeInstanceOf(Array);
  });
});
