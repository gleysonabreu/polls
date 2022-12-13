import { faker } from "@faker-js/faker";
import { ParticipantsRepositoryInMemory } from "../../../../modules/participant/repositories/participants-repository-inmemory";
import { ZodError } from "zod";
import { GetRankingUseCase } from "./get-ranking-use-case";
import { ParticipantsRepository } from "modules/participant/repositories/participants-repository";
import { PaticipantByPollId } from "modules/participant/repositories/types";

const mockGetRanking = () => ({
  pollId: faker.datatype.uuid(),
});

type SutTypes = {
  sut: GetRankingUseCase;
  participantReposirory: ParticipantsRepository;
}

const makeSut = (): SutTypes => {
  const participantReposirory = new ParticipantsRepositoryInMemory();
  const sut = new GetRankingUseCase(participantReposirory);

  return { sut, participantReposirory };
};
describe('Get Ranking Use Case', () => {
  it('should not be able to get ranking if there no pollId', async () => {
    const { sut } = makeSut();
    const getRanking = mockGetRanking();
    getRanking.pollId = '';

    const promise = sut.execute(getRanking);
    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });

  it('should be able to get ranking', async () => {
    const { sut, participantReposirory } = makeSut();
    const getRanking = mockGetRanking();
    const firstTeamScore = 1;
    const secondTeamScore = 1;

    const returnData = [
      {
        pollId: getRanking.pollId,
        userId: faker.datatype.uuid(),
        id: faker.datatype.uuid(),
        user: {
          id: faker.datatype.uuid(),
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

    const promise = await sut.execute(getRanking);
    expect(promise).toEqual(expect.arrayContaining([expect.objectContaining({
      id: returnData[0].user.id,
      points: 3,
    })]));
  });
});
