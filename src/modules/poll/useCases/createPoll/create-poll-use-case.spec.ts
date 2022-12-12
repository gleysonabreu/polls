import { ZodError } from "zod";
import { PollsRepository } from "../../../../modules/poll/repositories/polls-repository";
import { PollsRepositoryInMemory } from "../../../../modules/poll/repositories/polls-repository-inmemory";
import { CreatePollUseCase } from "./create-poll-use-case";

import { mockPoll } from '../../../../../tests';

type SutTypes = {
  sut: CreatePollUseCase;
  pollsRepository: PollsRepository;
}

const makeSut = (): SutTypes => {
  const pollsRepository = new PollsRepositoryInMemory();
  const sut = new CreatePollUseCase(pollsRepository);

  return { sut, pollsRepository };
}

describe('Create Poll Use Case', () => {
  it('should not be able to create a poll if user reached limit polls >= 15', async () => {
    const { sut, pollsRepository } = makeSut();
    const poll = mockPoll();

    jest.spyOn(pollsRepository, 'countByOwnerId').mockImplementationOnce(() => Promise.resolve(15));

    const promise = sut.execute(poll);
    await expect(promise).rejects.toEqual(new Error('You have reached the poll creation limit.'));
  });

  it('should not be able to create a poll if there no title', async () => {
    const { sut } = makeSut();
    const poll = mockPoll();
    poll.title = '';

    const promise = sut.execute(poll);
    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });


  it('should be able to create an poll', async () => {
    const { sut } = makeSut();
    const mPoll = mockPoll();

    const promise = await sut.execute(mPoll);
    expect(promise).toEqual(expect.objectContaining({
      title: mPoll.title,
      ownerId: mPoll.userId
    }));
  });
});
