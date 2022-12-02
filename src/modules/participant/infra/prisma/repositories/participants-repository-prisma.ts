import { ParticipantsRepository } from "../../../repositories/participants-repository";
import { prisma } from '../../../../../lib/prisma';
import { Participant } from '../../../entities/participant';
import { CreateParticipation, PaticipantByPollId } from "../../../repositories/types";

export class ParticipantsRepositoryPrisma implements ParticipantsRepository {
  async findParticipantByPollIdAndUserId(pollId: string, userId: string): Promise<Participant | null> {
    return prisma.participant.findUnique({
      where: {
        userId_pollId: {
          userId,
          pollId,
        }
      }
    });
  }

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

  async getParticipantsByPollId(id: string): Promise<PaticipantByPollId[]> {
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
