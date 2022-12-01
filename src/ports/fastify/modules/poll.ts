import { makeCountPollsController } from '../../../modules/poll/useCases/countPolls';
import { makeGetPollByIdController } from '../../../modules/poll/useCases/getPollById';
import { makeGetPollsController } from '../../../modules/poll/useCases/getPolls';
import { makeJoinPollController } from '../../../modules/poll/useCases/joinPoll';
import { makeGetRankingController } from '../../../modules/poll/useCases/getRanking';
import { makeCreatePollController } from '../../../modules/poll/useCases/createPoll';

import { authenticate } from '../../../plugins/authenticate';
import { app } from '../server';
import { adaptRoute } from '../fastify-route-adapter';

app
  .get(`/api/v1/polls/:id/ranking`,
    { onRequest: [authenticate] },
    adaptRoute(makeGetRankingController())
  );

app
  .post('/api/v1/polls',
    { onRequest: [authenticate] },
    adaptRoute(makeCreatePollController())
  );
app
  .get('/api/v1/polls/count',
    adaptRoute(makeCountPollsController())
  );

app
  .post('/api/v1/polls/join',
    { onRequest: [authenticate] },
    adaptRoute(makeJoinPollController())
  );

app
  .get('/api/v1/polls',
    { onRequest: [authenticate] },
    adaptRoute(makeGetPollsController())
  );

app
  .get('/api/v1/polls/:id',
    { onRequest: [authenticate] },
    adaptRoute(makeGetPollByIdController())
  );
