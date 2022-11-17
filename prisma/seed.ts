import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const user = await prisma.user.create({
    data: {
      email: 'johndoe@johndoe.com',
      name: 'John Doe',
      googleId: '14515451',
      avatarUrl: 'https://github.com/gleysonabreu.png',
    }
  });

  const poll = await prisma.poll.create({
    data: {
      title: 'Pool #1',
      code: 'Pool#1',
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-01T14:03:53.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 3,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              }
            }
          }
        }
      }
    }
  });

}

main();
