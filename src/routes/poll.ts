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
import { joinPollController } from '../modules/poll/useCases/joinPoll';
import { JoinPollControllerProps } from '../modules/poll/useCases/joinPoll/join-poll-controller';

export async function pollRoutes(fastify: FastifyInstance) {
  fastify
    .get<GetRankingControllerProps>(`/polls/:id/ranking`,
      { onRequest: [authenticate] },
      async (request, reply) => getRankingController.handle(request, reply));

  fastify
    .post<CreatePollControllerProps>('/polls',
      { onRequest: [authenticate] },
      async (request, reply) => createPollController.handle(request, reply));

  fastify
    .get('/polls/count',
      async (request, reply) => countPollsController.handle(request, reply));

  fastify
    .post<JoinPollControllerProps>('/polls/join',
      { onRequest: [authenticate] },
      async (request, reply) => joinPollController.handle(request, reply));

  fastify
    .get<GetPollsControllerProps>('/polls',
      { onRequest: [authenticate] },
      async (request, reply) => getPollsController.handle(request, reply));

  fastify
    .get<GetPollByIdControllerProps>('/polls/:id',
      async (request, reply) => getPollByIdController.handle(request, reply));
}

