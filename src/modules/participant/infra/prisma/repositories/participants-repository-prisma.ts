import { Participant } from "@prisma/client";
import { ParticipantsRepository } from "../../../repositories/participants-repository";
import { prisma } from '../../../../../lib/prisma';

export class ParticipantsRepositoryPrisma implements ParticipantsRepository {
  async getParticipantsByPollId(id: string): Promise<Participant[]> {
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
