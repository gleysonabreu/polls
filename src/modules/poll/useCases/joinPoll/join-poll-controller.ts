import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { JoinPollUseCase } from "./join-poll-use-case";

export namespace JoinPollController {
  export type Request = {
    code: string;
    userId: string;
  }
}

export class JoinPollController implements Controller {
  constructor(private joinPollUseCase: JoinPollUseCase) { }

  async handle(request: JoinPollController.Request) {
    const { code, userId } = request;

    try {
      const poll = await this.joinPollUseCase.execute({
        code,
        userId,
      });
      return ok(poll);
    } catch (error: any) {
      return serverError(error);
    }

  }
}
