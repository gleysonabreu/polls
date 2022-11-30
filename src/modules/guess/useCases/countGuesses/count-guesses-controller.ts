import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { HttpResponse } from "../../../../protocols/http";
import { CountGuessesUseCase } from "./count-guesses-use-case";

export namespace CountGuessesController {
  export type Request = {}
}

export class CountGuessesController implements Controller {
  constructor(private countGuessesUseCase: CountGuessesUseCase) { }

  async handle(_request: CountGuessesController.Request): Promise<HttpResponse> {
    try {
      const count = await this.countGuessesUseCase.execute();
      return ok({ count });
    } catch (error: any) {
      return serverError(error);
    }
  }
}
