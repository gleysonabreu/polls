import { CreateParticipation, ParticipantsRepository, ReturnPaticipantByPollId } from "../../../repositories/participants-repository";
import { prisma } from '../../../../../lib/prisma';

export class ParticipantsRepositoryPrisma implements ParticipantsRepository {
  async create({ userId, pollId }: CreateParticipation): Promise<void> {
    await prisma.participant.create({
      data: {
        pollId,
        userId,
      }
    });
  }

  async getTotalPollsUserJoined(userId: string): Promise<number> {
    return prisma.participant.count({
      where: {
        userId,
        poll: {
          ownerId: {
            not: userId,
          }
        }
      }
    });
  }

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
