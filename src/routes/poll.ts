import z from 'zod';
import ShortUniqueId from 'short-unique-id';
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';
import { authenticate } from '../plugins/authenticate';

export async function pollRoutes(fastify: FastifyInstance) {
  fastify.get(`/polls/:id/ranking`, { onRequest: [authenticate] }, async (req, _reply) => {
    const getPollParam = z.object({
      id: z.string(),
    });

    const { id } = getPollParam.parse(req.params);

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

    const rankingPoints = participants.map(participant => {
      let points = 0;
      participant.guesses.map(guess => {
        if (guess.firstTeamPoints === guess.game.firstTeamScore && guess.secondTeamPoints === guess.secondTeamPoints) {
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
    return { ranking: sortRanking }
  });

  fastify.post('/polls', { onRequest: [authenticate] }, async (req, reply) => {
    const createPoolBody = z.object({
      title: z.string()
    });

    const totalPolls = await prisma.poll.count({
      where: {
        ownerId: req.user.sub,
      }
    });

    if (totalPolls > 15) {
      return reply.status(400).send({ message: 'You have reached the poll creation limit.' });
    }

    const { title } = createPoolBody.parse(req.body);
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    const poll = await prisma.poll.create({
      data: {
        title,
        code,
        ownerId: req.user.sub,

        participants: {
          create: {
            userId: req.user.sub,
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

    return reply.status(201).send(poll);
  });

  fastify.get('/polls/count', async () => {
    const count = await prisma.poll.count();
    return {
      count,
    };
  });

  fastify.post('/polls/join', { onRequest: [authenticate] }, async (req, reply) => {
    const joinPollBody = z.object({
      code: z.string(),
    });

    const { code } = joinPollBody.parse(req.body);

    const poll = await prisma.poll.findUnique({
      where: {
        code,
      },
      include: {
        participants: {
          where: {
            userId: req.user.sub,
          }
        },
      }
    });

    if (!poll) {
      return reply.status(400).send({ message: 'Poll not found!' });
    }

    if (poll.participants.length > 0) {
      return reply.status(400).send({ message: 'You already joined this poll!' });
    }

    const pollsUserAlreadyJoin = await prisma.participant.count({
      where: {
        userId: req.user.sub,
        poll: {
          ownerId: {
            not: req.user.sub,
          }
        }
      }
    });

    if (pollsUserAlreadyJoin > 15) {
      return reply.status(400).send({
        message: 'You have reached the maximum poll participation limit.'
      })
    }

    await prisma.participant.create({
      data: {
        pollId: poll.id,
        userId: req.user.sub,
      }
    });

    const pollJoined = await prisma.poll.findUnique({
      where: {
        code
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

    return reply.status(201).send(pollJoined);
  });

  fastify.get('/polls', { onRequest: [authenticate] }, async (request, reply) => {
    const paginationPollsQuery = z.object({
      page: z.string().optional(),
      perPage: z.string().optional(),
    });

    const { page, perPage } = paginationPollsQuery.parse(request.query);

    const pageCalc = Number(page || 1) - 1;
    const take = Number(perPage) || 10;
    const skip = pageCalc * take;

    const totalPolls = await prisma.poll.count({
      where: {
        participants: {
          some: {
            userId: request.user.sub,
          }
        }
      }
    });

    const polls = await prisma.poll.findMany({
      where: {
        participants: {
          some: {
            userId: request.user.sub,
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

    reply.headers({ 'x-total-count': totalPolls });
    return reply.status(200).send({ polls });
  });

  fastify.get('/polls/:id', async (request) => {
    const getPollParams = z.object({
      id: z.string(),
    });

    const { id } = getPollParams.parse(request.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id,
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

    return { poll }

  });
}

