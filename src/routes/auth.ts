import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from '../lib/prisma';
import { authenticate } from "../plugins/authenticate";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/me', { onRequest: [authenticate] }, async (req, _reply) => {
    return { user: req.user };
  });

  fastify.post('/users', async (req, _reply) => {
    const createUserBody = z.object({
      access_token: z.string(),
    });

    const { access_token } = createUserBody.parse(req.body);

    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const { email, id, name, picture } = userInfoSchema.parse(userData);

    let user = await prisma.user.findUnique({
      where: {
        googleId: id,
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          googleId: id,
          name,
          avatarUrl: picture,
        }
      });
    }

    const token = fastify.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl,
    }, {
      sub: user.id,
      expiresIn: '1d',
    });

    return { token };
  });
}
