import { ParticipantsRepository } from "../../../participant/repositories/participants-repository";
import z from 'zod';

type GetRankingUseCaseProps = {
  pollId: string;
};

export class GetRankingUseCase {
  constructor(private participantsRepository: ParticipantsRepository) { }

  async execute(request: GetRankingUseCaseProps) {
    const getPollParam = z.object({
      pollId: z.string().min(1),
    });

    const { pollId } = getPollParam.parse(request);
    const participants = await this.participantsRepository.getParticipantsByPollId(pollId);

    const rankingPoints = participants.map(participant => {
      let points = 0;
      participant.guesses.map(guess => {
        if (guess.firstTeamPoints === guess.game.firstTeamScore && guess.secondTeamPoints === guess.game.secondTeamScore) {
          points += 3;
        }
      });

      return {
        id: participant.user.id,
        avatarUrl: participant.user.avatarUrl,
        name: participant.user.name,
        points,
      }
    });


    const sortRanking = rankingPoints.sort((a, b) => b.points - a.points);
    return sortRanking;
  }
};
