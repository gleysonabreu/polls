import { GamesRepository } from "../../repositories/games-repository";
import z from 'zod';
import { GetGameGuessesDTO } from "../../dtos/get-game-guesses-dto";

export class GetGameGuessesUseCase {
  constructor(private gamesRepository: GamesRepository) { }

  async execute(request: GetGameGuessesDTO) {
    const getGuessesParams = z.object({
      pollId: z.string(),
      gameId: z.string(),
    });
    const { pollId, gameId } = getGuessesParams.parse(request);

    const game = await this.gamesRepository.getGameGuesses({ pollId, gameId });
    return { game };
  }
}
