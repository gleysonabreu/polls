import { GuessesRepository } from "../../repositories/guesses-repository";
import z from 'zod';
import { ParticipantsRepository } from "../../../participant/repositories/participants-repository";
import { GamesRepository } from "../../../game/repositories/games-repository";

type CreateGuessUseCaseProps = {
  pollId: string;
  gameId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  userId: string;
};

export class CreateGuessUseCase {
  constructor(
    private guessesRepository: GuessesRepository,
    private participantsRepository: ParticipantsRepository,
    private gamesRepository: GamesRepository,
  ) { }

  async execute(request: CreateGuessUseCaseProps) {
    const createGuessParams = z.object({
      pollId: z.string(),
      gameId: z.string(),
      userId: z.string(),
    });

    const createGuessBody = z.object({
      firstTeamPoints: z.number().nonnegative(),
      secondTeamPoints: z.number().nonnegative(),
    });

    const { pollId, gameId, userId } = createGuessParams.parse(request);
    const { secondTeamPoints, firstTeamPoints } = createGuessBody.parse(request);

    const participant = await this.participantsRepository.findParticipantByPollIdAndUserId(pollId, userId);
    if (!participant) {
      throw new Error("You are not allowed to create a guess inside this poll.");
    }

    const guess = await this.guessesRepository.findGuessByGameIdAndParticipantId(gameId, participant.id);
    if (guess) {
      throw new Error("You already sent a guess to this game on this poll.");
    }

    const game = await this.gamesRepository.findById(gameId);
    if (!game) {
      throw new Error("Game not found!");
    }

    if (game.date < new Date()) {
      throw new Error("You cannot send guesses after the game date.");
    }

    return this.guessesRepository.create({
      firstTeamPoints,
      secondTeamPoints,
      gameId,
      participantId: participant.id,
    });
  }
}
