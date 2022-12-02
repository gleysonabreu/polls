import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { HttpResponse } from "../../../../protocols/http";
import { GetGameGuessesDTO } from "../../dtos/get-game-guesses-dto";
import { GetGameGuessesUseCase } from "./get-game-guesses-use-case";

export namespace GetGameGuessesController {
  export type Request = GetGameGuessesDTO;
}

export class GetGameGuessesController implements Controller {
  constructor(private getGameGuessesUseCase: GetGameGuessesUseCase) { }

  async handle(request: GetGameGuessesController.Request): Promise<HttpResponse> {
    const { gameId, pollId } = request;

    try {
      const gameResult = await this.getGameGuessesUseCase.execute({ pollId, gameId });
      return ok(gameResult);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
