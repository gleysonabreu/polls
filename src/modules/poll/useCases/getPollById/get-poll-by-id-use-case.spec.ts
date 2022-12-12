import { faker } from "@faker-js/faker";
import { PollsRepository } from "modules/poll/repositories/polls-repository";
import { ZodError } from "zod";
import { mockPoll } from "../../../../../tests";
import { PollsRepositoryInMemory } from "../../../../modules/poll/repositories/polls-repository-inmemory";
import { GetPollByIdUseCase } from "./get-poll-by-id-use-case";

type SutTypes = {
  sut: GetPollByIdUseCase;
  pollsRepository: PollsRepository;
}

const makeSut = (): SutTypes => {
  const pollsRepository = new PollsRepositoryInMemory();
  const sut = new GetPollByIdUseCase(pollsRepository);

  return { sut, pollsRepository };
}

const mockGetPollById = () => ({ id: faker.datatype.uuid() });

describe('Get Poll By Id Use Case', () => {
  it('should not be able to get poll if there no id', async () => {
    const { sut } = makeSut();
    const getPollId = mockGetPollById();
    getPollId.id = '';

    const res = sut.execute(getPollId);
    await expect(res).rejects.toBeInstanceOf(ZodError);
  });

  it('should not be able to get poll if there no poll', async () => {
    const { sut } = makeSut();
    const getPollId = mockGetPollById();

    const res = sut.execute(getPollId);
    await expect(res).rejects.toEqual(new Error('This poll not exists!'));
  });

  it('should be able to get poll', async () => {
    const { sut, pollsRepository } = makeSut();
    const poll = mockPoll();

    const data = await pollsRepository.create({
      ...poll,
      code: faker.datatype.uuid(),
    });

    const res = await sut.execute({ id: data.id });
    expect(res).toEqual(expect.objectContaining({
      id: data.id,
      ownerId: data.ownerId,
      code: data.code,
    }));
  });
});
