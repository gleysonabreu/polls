import Fastify from 'fastify';
import jwt from '@fastify/jwt';

const app = Fastify({
  logger: !!(process.env.NODE_ENV !== 'development'),
});

app.register(jwt, {
  secret: process.env.JWT_SECRET,
});

export { app };
