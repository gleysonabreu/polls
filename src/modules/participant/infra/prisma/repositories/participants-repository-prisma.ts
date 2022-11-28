import { ParticipantsRepository, ReturnPaticipantByPollId } from "../../../repositories/participants-repository";
import { prisma } from '../../../../../lib/prisma';

export class ParticipantsRepositoryPrisma implements ParticipantsRepository {
  async getParticipantsByPollId(id: string): Promise<ReturnPaticipantByPollId[]> {
    const participants = await prisma.participant.findMany({
      where: {
        pollId: id,
      },
      include: {
        user: true,
        guesses: {
          select: {
            firstTeamPoints: true,
            secondTeamPoints: true,
            game: true,
          }
        }
      }
    });

    return participants;
  }
}
