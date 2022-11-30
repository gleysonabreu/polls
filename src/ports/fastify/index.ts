import cors from '@fastify/cors';
import { app } from './server';

import './modules';


app.register(cors, {
  origin: process.env.ALLOWED_ORIGIN_CORS.split(',').map(origin => origin.trim()),
  exposedHeaders: ['x-total-count'],
});

export async function start() {
  try {
    await app.listen({ port: process.env.PORT, host: '0.0.0.0' });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}
