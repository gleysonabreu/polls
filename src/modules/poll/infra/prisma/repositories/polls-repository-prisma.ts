import { Poll } from '@prisma/client';
import { prisma } from '../../../../../lib/prisma';
import { PollsRepository } from '../../../repositories/polls-repository';
import {
  CreatePoll,
  GetPollByCode,
  GetPollsUserPagination,
  PollByCodeWithParticipants
} from '../../../repositories/types';

export class PollsRepositoryPrisma implements PollsRepository {
  async findPollByCodeWithUserParticipants({ code, userId }: PollByCodeWithParticipants): Promise<GetPollByCode | null> {
    return prisma.poll.findUnique({
      where: {
        code,
      },
      include: {
        participants: {
          where: {
            userId,
          }
        },
      }
    });
  }

  async getPollsUser({ userId, skip, take }: GetPollsUserPagination): Promise<Poll[]> {
    const polls = await prisma.poll.findMany({
      where: {
        participants: {
          some: {
            userId,
          }
        }
      },
      take,
      skip,
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

    return polls;
  };

  async countPollsUser(userId: string): Promise<number> {
    return prisma.poll.count({
      where: {
        participants: {
          some: {
            userId,
          }
        }
      }
    });
  }

  async findById(id: string): Promise<Poll | null> {
    const poll = await prisma.poll.findFirst({
      where: {
        OR: [{ id }, { code: id }]
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

  async count(): Promise<number> {
    return prisma.poll.count();
  }

  async countByOwnerId(id: string): Promise<number> {
    return prisma.poll.count({
      where: {
        ownerId: id,
      }
    });
  };

  async create({ code, title, userId }: CreatePoll): Promise<Poll> {
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
