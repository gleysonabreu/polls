import { FastifyInstance } from "fastify";

import { pollRoutes } from './poll';
import { guessRoutes } from './guess';
import { userRoutes } from './user';
import { authRoutes } from './auth';
import { gameRoutes } from './game';

export async function routes(fastify: FastifyInstance) {
  await fastify.register(pollRoutes, { prefix: '/api/v1' });
  await fastify.register(gameRoutes, { prefix: '/api/v1' });
  await fastify.register(guessRoutes, { prefix: '/api/v1' });
  await fastify.register(userRoutes, { prefix: '/api/v1' });
  await fastify.register(authRoutes, { prefix: '/api/v1' });
}
