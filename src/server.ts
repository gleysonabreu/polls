import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { routes } from './routes';

async function bootstrap() {
  const fastify = Fastify({
    logger: !!(process.env.NODE_ENV !== 'development'),
  });

  await fastify.register(cors, {
    origin: process.env.ALLOWED_ORIGIN_CORS.split(',').map(origin => origin.trim()),
    exposedHeaders: ['x-total-count'],
  });

  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
  });

  await fastify.register(routes);

  await fastify.listen({ port: process.env.PORT, host: '0.0.0.0' });
}

bootstrap();
