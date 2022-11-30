import { authenticate } from '../../../plugins/authenticate';
import { createPollController } from '../../../modules/poll/useCases/createPoll';
import { CreatePollControllerProps } from '../../../modules/poll/useCases/createPoll/create-poll-controller';
import { countPollsController } from '../../../modules/poll/useCases/countPolls';
import { getPollByIdController } from '../../../modules/poll/useCases/getPollById';
import { GetPollByIdControllerProps } from '../../../modules/poll/useCases/getPollById/get-poll-by-id-controller';
import { getPollsController } from '../../../modules/poll/useCases/getPolls';
import { GetPollsControllerProps } from '../../../modules/poll/useCases/getPolls/get-polls-controller';
import { getRankingController } from '../../../modules/poll/useCases/getRanking';
import { GetRankingControllerProps } from '../../../modules/poll/useCases/getRanking/get-ranking-controller';
import { joinPollController } from '../../../modules/poll/useCases/joinPoll';
import { JoinPollControllerProps } from '../../../modules/poll/useCases/joinPoll/join-poll-controller';
import { app } from '../server';

app
  .get<GetRankingControllerProps>(`/api/v1/polls/:id/ranking`,
    { onRequest: [authenticate] },
    async (request, reply) => getRankingController.handle(request, reply));

app
  .post<CreatePollControllerProps>('/api/v1/polls',
    { onRequest: [authenticate] },
    async (request, reply) => createPollController.handle(request, reply));

app
  .get('/api/v1/polls/count',
    async (request, reply) => countPollsController.handle(request, reply));

app
  .post<JoinPollControllerProps>('/api/v1/polls/join',
    { onRequest: [authenticate] },
    async (request, reply) => joinPollController.handle(request, reply));

app
  .get<GetPollsControllerProps>('/api/v1/polls',
    { onRequest: [authenticate] },
    async (request, reply) => getPollsController.handle(request, reply));

app
  .get<GetPollByIdControllerProps>('/api/v1/polls/:id',
    { onRequest: [authenticate] },
    async (request, reply) => getPollByIdController.handle(request, reply));

