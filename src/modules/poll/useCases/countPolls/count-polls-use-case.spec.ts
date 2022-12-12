import { PollsRepository } from "../../../../modules/poll/repositories/polls-repository";
import { CountPollsUseCase } from "./count-polls-use-case";
import { PollsRepositoryInMemory } from "../../../../modules/poll/repositories/polls-repository-inmemory";

type SutTypes = {
  sut: CountPollsUseCase;
  pollsRepository: PollsRepository;
}

const makeSut = (): SutTypes => {
  const pollsRepository = new PollsRepositoryInMemory();
  const sut = new CountPollsUseCase(pollsRepository);

  return { sut, pollsRepository };
}

describe('Count Polls Use Case', () => {
  it('should be able to count total polls', async () => {
    const { sut } = makeSut();

    const result = await sut.execute();
    expect(result).toEqual(0);
  });
});
