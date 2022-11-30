import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from '../lib/prisma';
import { countGuessesController } from "../modules/guess/useCases/countGuesses";
import { authenticate } from "../plugins/authenticate";

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get('/guesses/count', async (request, reply) => countGuessesController.handle(request, reply));

  fastify.get('/polls/:pollId/games/:gameId/guesses', { onRequest: [authenticate] }, async (request, reply) => {
    const getGuessesParams = z.object({
      pollId: z.string(),
      gameId: z.string(),
    });
    const { pollId, gameId } = getGuessesParams.parse(request.params);

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        guesses: {
          include: {
            participant: {
              select: {
                user: true,
              }
            }
          },
          where: {
            participant: {
              pollId,
            }
          }
        }
      }
    });

    return { game };

  });

  fastify.post('/polls/:pollId/games/:gameId/guesses', { onRequest: [authenticate] }, async (request, reply) => {
    const createGuessParams = z.object({
      pollId: z.string(),
      gameId: z.string(),
    });

    const createGuessBody = z.object({
      firstTeamPoints: z.number().nonnegative(),
      secondTeamPoints: z.number().nonnegative(),
    });

    const { pollId, gameId } = createGuessParams.parse(request.params);
    const { secondTeamPoints, firstTeamPoints } = createGuessBody.parse(request.body);

    const participant = await prisma.participant.findUnique({
      where: {
        userId_pollId: {
          userId: request.user.sub,
          pollId,
        }
      }
    });

    if (!participant) {
      return reply.status(400).send({ message: "You are not allowed to create a guess inside this poll." });
    }

    const guess = await prisma.guess.findUnique({
      where: {
        participantId_gameId: {
          gameId,
          participantId: participant.id,
        }
      }
    });

    if (guess) {
      return reply.status(400).send({ message: "You already sent a guess to this game on this poll." });
    }

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      }
    });

    if (!game) {
      return reply.status(400).send({ message: "Game not found!" });
    }

    if (game.date < new Date()) {
      return reply.status(400).send({ message: "You cannot send guesses after the game date." });
    }

    const guessData = await prisma.guess.create({
      data: {
        firstTeamPoints,
        secondTeamPoints,
        gameId,
        participantId: participant.id,
      }
    });

    return reply.status(201).send(guessData);

  });
}
