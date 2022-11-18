import Fastify from 'fastify';
import cors from '@fastify/cors';
import { pollRoutes } from './routes/poll';
import { guessRoutes } from './routes/guess';
import { userRoutes } from './routes/user';
import { authRoutes } from './routes/auth';
import jwt from '@fastify/jwt';
import { gameRoutes } from './routes/game';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: process.env.ALLOWED_ORIGIN_CORS.split(',').map(origin => origin.trim()),
    exposedHeaders: ['x-total-count'],
  });

  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
  });

  await fastify.register(pollRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(userRoutes);
  await fastify.register(authRoutes);

  await fastify.listen({ port: process.env.PORT, host: '0.0.0.0' });
}

bootstrap();
