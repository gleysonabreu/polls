import z from 'zod';
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';
import { authenticate } from '../plugins/authenticate';
import { createPollController } from '../modules/poll/useCases/createPoll';
import { CreatePollControllerProps } from '../modules/poll/useCases/createPoll/create-poll-controller';
import { countPollsController } from '../modules/poll/useCases/countPolls';
import { getPollByIdController } from '../modules/poll/useCases/getPollById';
import { GetPollByIdControllerProps } from '../modules/poll/useCases/getPollById/get-poll-by-id-controller';
import { getPollsController } from '../modules/poll/useCases/getPolls';
import { GetPollsControllerProps } from '../modules/poll/useCases/getPolls/get-polls-controller';
import { getRankingController } from '../modules/poll/useCases/getRanking';
import { GetRankingControllerProps } from '../modules/poll/useCases/getRanking/get-ranking-controller';

export async function pollRoutes(fastify: FastifyInstance) {
  fastify.get<GetRankingControllerProps>(`/polls/:id/ranking`, { onRequest: [authenticate] }, async (request, reply) => getRankingController.handle(request, reply));

  fastify.post<CreatePollControllerProps>('/polls', { onRequest: [authenticate] }, async (request, reply) => createPollController.handle(request, reply));

  fastify.get('/polls/count', async (request, reply) => countPollsController.handle(request, reply));

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

  fastify.get<GetPollsControllerProps>('/polls', { onRequest: [authenticate] }, async (request, reply) => getPollsController.handle(request, reply));
  fastify.get<GetPollByIdControllerProps>('/polls/:id', async (request, reply) => getPollByIdController.handle(request, reply));
}

