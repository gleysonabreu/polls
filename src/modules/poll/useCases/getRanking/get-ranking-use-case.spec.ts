import { faker } from "@faker-js/faker";
import { ParticipantsRepositoryInMemory } from "../../../../modules/participant/repositories/participants-repository-inmemory";
import { ZodError } from "zod";
import { GetRankingUseCase } from "./get-ranking-use-case";
import { ParticipantsRepository } from "../../../../modules/participant/repositories/participants-repository";
import { PaticipantByPollId } from "../../../../modules/participant/repositories/types";
import { PollsRepositoryInMemory } from "../../../../modules/poll/repositories/polls-repository-inmemory";
import { PollsRepository } from "../../../../modules/poll/repositories/polls-repository";

const mockGetRanking = () => ({
  pollId: faker.datatype.uuid(),
});

type SutTypes = {
  sut: GetRankingUseCase;
  participantReposirory: ParticipantsRepository;
  pollsRepository: PollsRepository;
}

const makeSut = (): SutTypes => {
  const pollsRepository = new PollsRepositoryInMemory();
  const participantReposirory = new ParticipantsRepositoryInMemory();
  const sut = new GetRankingUseCase(participantReposirory, pollsRepository);

  return { sut, participantReposirory, pollsRepository };
};
describe('Get Ranking Use Case', () => {
  it('should not be able to get ranking if there no pollId', async () => {
    const { sut } = makeSut();
    const getRanking = mockGetRanking();
    getRanking.pollId = '';

    const promise = sut.execute(getRanking);
    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });

  it('should not be able to get ranking if there no poll', async () => {
    const { sut } = makeSut();
    const getRanking = mockGetRanking();

    const promise = sut.execute(getRanking);
    await expect(promise).rejects.toEqual(new Error('This poll does not exist!'));
  });

  it('should be able to get ranking', async () => {
    const { sut, pollsRepository, participantReposirory } = makeSut();
    const firstTeamScore = 1;
    const secondTeamScore = 1;

    const poll = await pollsRepository.create({
      userId: faker.datatype.uuid(),
      code: faker.datatype.uuid(),
      title: faker.name.fullName()
    });

    const returnData = [
      {
        pollId: poll.id,
        userId: poll.ownerId,
        id: faker.datatype.uuid(),
        user: {
          id: poll.ownerId,
          avatarUrl: faker.image.avatar(),
          name: faker.name.fullName()
        },
        guesses: [{
          firstTeamPoints: firstTeamScore,
          secondTeamPoints: secondTeamScore,
          game: {
            firstTeamScore,
            secondTeamScore,
          }
        }]
      }
    ] as PaticipantByPollId[];

    jest.spyOn(participantReposirory, 'getParticipantsByPollId').mockImplementationOnce(async () => (returnData));

    const promise = await sut.execute({ pollId: poll.id });
    expect(promise).toEqual(expect.arrayContaining([expect.objectContaining({
      id: returnData[0].user.id,
      points: 3,
    })]));
  });
});
