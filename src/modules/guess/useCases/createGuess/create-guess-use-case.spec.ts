import { faker } from "@faker-js/faker";
import { ZodError } from 'zod';

import { mockGame, mockParticipant } from "../../../../../tests";

import { ParticipantsRepository } from "../../../../modules/participant/repositories/participants-repository";
import { CreateGuessUseCase } from "./create-guess-use-case";

import { CreateGuessController } from "./create-guess-controller";

import { GamesRepository } from "../../../../modules/game/repositories/games-repository";
import { GuessesRepository } from "../../../../modules/guess/repositories/guesses-repository";

import { ParticipantsRepositoryInMemory } from "../../../../modules/participant/repositories/participants-repository-inmemory";
import { GuessesRepositoryInMemory } from "../../../../modules/guess/repositories/guesseses-repository-inmemory";
import { GamesRepositoryInMemory } from "../../../../modules/game/repositories/games-repository-inmemory";

type SutTypes = {
  sut: CreateGuessUseCase;
  guessesRepository: GuessesRepository;
  participantsRepository: ParticipantsRepository;
  gamesRepository: GamesRepository;
}

const mockCreateGuess = (): CreateGuessController.Request => ({
  pollId: faker.datatype.uuid(),
  userId: faker.datatype.uuid(),
  gameId: faker.datatype.uuid(),
  firstTeamPoints: faker.datatype.number(),
  secondTeamPoints: faker.datatype.number(),
});

const makeSut = (): SutTypes => {
  const guessesRepository = new GuessesRepositoryInMemory();
  const participantsRepository = new ParticipantsRepositoryInMemory();
  const gamesRepository = new GamesRepositoryInMemory();
  const sut = new CreateGuessUseCase(guessesRepository, participantsRepository, gamesRepository);

  return { sut, guessesRepository, participantsRepository, gamesRepository };
}
describe('Create Guess Use Case', () => {
  it('should not be able to create an guess if participant not joined in the poll', async () => {
    const { sut } = makeSut();
    const params = mockCreateGuess();

    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(new Error("You are not allowed to create a guess inside this poll."))
  });

  it('should not be able to create an guess if you already sent a guess to the game', async () => {
    const { sut, guessesRepository, participantsRepository } = makeSut();
    const params = mockCreateGuess();
    const participant = mockParticipant();
    participant.userId = params.userId;
    participant.pollId = params.pollId;

    await participantsRepository.create(participant);

    await guessesRepository.create({
      id: faker.datatype.uuid(),
      gameId: params.gameId,
      firstTeamPoints: 1,
      participantId: participant.id,
      secondTeamPoints: 1,
    });

    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(new Error("You already sent a guess to this game on this poll."))
  });

  it('should not be able to create an guess if game not exists', async () => {
    const { sut, participantsRepository } = makeSut();
    const params = mockCreateGuess();

    const participant = mockParticipant();
    participant.userId = params.userId;
    participant.pollId = params.pollId;

    await participantsRepository.create(participant);

    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(new Error("Game not found!"));
  });

  it('should not be able to create an guess if date game < date now ', async () => {
    const { sut, participantsRepository, gamesRepository } = makeSut();
    const params = mockCreateGuess();

    const game = mockGame();
    game.id = params.gameId;
    game.date = faker.date.past();

    const participant = mockParticipant();
    participant.userId = params.userId;
    participant.pollId = params.pollId;

    await gamesRepository.create(game);
    await participantsRepository.create(participant);

    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(new Error("You cannot send guesses after the game date."));
  });

  it('should be able to create an guess', async () => {
    const { sut, participantsRepository, gamesRepository } = makeSut();
    const params = mockCreateGuess();

    const game = mockGame();
    game.id = params.gameId;

    const participant = mockParticipant();
    participant.userId = params.userId;
    participant.pollId = params.pollId;

    await gamesRepository.create(game);
    await participantsRepository.create(participant);

    const promise = await sut.execute(params);
    expect(promise).toEqual(expect.objectContaining({
      firstTeamPoints: params.firstTeamPoints,
      secondTeamPoints: params.secondTeamPoints,
      gameId: params.gameId,
      participantId: participant.id
    }));
  });

  it('should not be able to create an guess if no pollId', async () => {
    const { sut } = makeSut();
    const params = mockCreateGuess();
    params.pollId = '';

    const promise = sut.execute(params);
    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });

  it('should not be able to create an guess if no gameId', async () => {
    const { sut } = makeSut();
    const params = mockCreateGuess();
    params.gameId = '';

    const promise = sut.execute(params);
    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });

  it('should not be able to create an guess if no userId', async () => {
    const { sut } = makeSut();
    const params = mockCreateGuess();
    params.userId = '';

    const promise = sut.execute(params);
    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });

  it('should not be able to create an guess if firstTeamPoints is a negative number', async () => {
    const { sut } = makeSut();
    const params = mockCreateGuess();
    params.firstTeamPoints = -1;

    const promise = sut.execute(params);
    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });

  it('should not be able to create an guess if secondTeamPoints is a negative number', async () => {
    const { sut } = makeSut();
    const params = mockCreateGuess();
    params.secondTeamPoints = -1;

    const promise = sut.execute(params);
    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });
});
