import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { CountPollsUseCase } from "./count-polls-use-case";

export namespace CountPollsController {
  export type Request = {}
}

export class CountPollsController implements Controller {
  constructor(private countPollsUseCase: CountPollsUseCase) { }

  async handle(_request: CountPollsController.Request) {
    try {
      const count = await this.countPollsUseCase.execute();
      return ok({ count });
    } catch (error: any) {
      return serverError(error);
    }
  }
}
