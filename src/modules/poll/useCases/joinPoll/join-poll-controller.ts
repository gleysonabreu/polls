import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { JoinPollDTO } from "../../dtos/join-poll-dto";
import { JoinPollUseCase } from "./join-poll-use-case";

export namespace JoinPollController {
  export type Request = JoinPollDTO;
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
