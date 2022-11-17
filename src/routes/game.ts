import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from '../lib/prisma';
import { authenticate } from "../plugins/authenticate";

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get('/polls/:id/games', { onRequest: [authenticate] }, async (req, reply) => {
    const getPollParam = z.object({
      id: z.string(),
    });

    const { id } = getPollParam.parse(req.params);

    const paginationPollsQuery = z.object({
      page: z.string().optional(),
      perPage: z.string().optional(),
    });

    const { page, perPage } = paginationPollsQuery.parse(req.query);
    const pageCalc = Number(page || 1) - 1;

    const take = Number(perPage) || 10;
    const skip = pageCalc * take;

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'desc'
      },
      take,
      skip,
      include: {
        guesses: {
          where: {
            participant: {
              userId: req.user.sub,
              pollId: id,
            }
          },
        }
      },
    });

    const totalGuesses = (await prisma.game.findMany({
      include: {
        guesses: {
          where: {
            participant: {
              userId: req.user.sub,
              pollId: id,
            }
          },
        }
      },
    })).length;

    const gamesFiltered = games.map(game => {
      return {
        ...game,
        guess: game.guesses.length > 0 ? game.guesses[0] : null,
        guesses: undefined,
      }
    });

    reply.headers({ 'x-total-count': totalGuesses });
    return {
      games: gamesFiltered,
    };
  });
}
