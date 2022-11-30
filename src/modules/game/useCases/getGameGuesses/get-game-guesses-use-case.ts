import { GamesRepository } from "../../repositories/games-repository";
import z from 'zod';

type GetGameGuessesUseCaseProps = {
  gameId: string;
  pollId: string;
};

export class GetGameGuessesUseCase {
  constructor(private gamesRepository: GamesRepository) { }

  async execute(request: GetGameGuessesUseCaseProps) {
    const getGuessesParams = z.object({
      pollId: z.string(),
      gameId: z.string(),
    });
    const { pollId, gameId } = getGuessesParams.parse(request);

    const game = await this.gamesRepository.getGameGuesses({ pollId, gameId });
    return { game };
  }
}
