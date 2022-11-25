import { Poll } from '@prisma/client';
import { prisma } from '../../../../../lib/prisma';
import { CreatePollProps, PollsRepository } from "../../../repositories/polls-repository";

export class PollsRepositoryPrisma implements PollsRepository {
  async countByOwnerId(id: string): Promise<number> {
    return prisma.poll.count({
      where: {
        ownerId: id,
      }
    });
  };

  async create({ code, title, userId }: CreatePollProps): Promise<Poll> {
    const poll = await prisma.poll.create({
      data: {
        title,
        code,
        ownerId: userId,

        participants: {
          create: {
            userId,
          }
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true,
              }
            }
          },
          take: 4,
        },
        _count: {
          select: {
            participants: true,
          }
        },
        owner: {
          select: {
            name: true,
            id: true
          }
        }
      }
    });

    return poll;
  };
}
