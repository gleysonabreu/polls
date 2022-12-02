import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { CreateGuessDTO } from "../../dtos/create-guess-dto";
import { CreateGuessUseCase } from "./create-guess-use-case";

export namespace CreateGuessController {
  export type Request = CreateGuessDTO
}

export class CreateGuessController implements Controller {
  constructor(private createGuessUseCase: CreateGuessUseCase) { }

  async handle(request: CreateGuessController.Request) {
    const { gameId, pollId, firstTeamPoints, secondTeamPoints, userId } = request;

    try {
      const guess = await this.createGuessUseCase.execute({
        secondTeamPoints,
        firstTeamPoints,
        pollId,
        gameId,
        userId,
      });

      return ok(guess);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
