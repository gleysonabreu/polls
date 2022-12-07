import { GuessesRepository } from "../../repositories/guesses-repository";
import z from 'zod';
import { ParticipantsRepository } from "../../../participant/repositories/participants-repository";
import { GamesRepository } from "../../../game/repositories/games-repository";
import { CreateGuessDTO } from "../../dtos/create-guess-dto";

export class CreateGuessUseCase {
  constructor(
    private guessesRepository: GuessesRepository,
    private participantsRepository: ParticipantsRepository,
    private gamesRepository: GamesRepository,
  ) { }

  async execute(request: CreateGuessDTO) {
    const createGuessParams = z.object({
      pollId: z.string().min(1),
      gameId: z.string().min(1),
      userId: z.string().min(1),
    });

    const createGuessBody = z.object({
      firstTeamPoints: z.number().nonnegative().min(0),
      secondTeamPoints: z.number().nonnegative().min(0),
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
