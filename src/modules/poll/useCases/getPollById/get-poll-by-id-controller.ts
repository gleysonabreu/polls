import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { GetPollByIdUseCase } from "./get-poll-by-id-use-case";

export namespace GetPollByIdController {
  export type Request = {
    id: string;
  }
}

export class GetPollByIdController implements Controller {
  constructor(private getPollByIdUseCase: GetPollByIdUseCase) { }

  async handle(request: GetPollByIdController.Request) {
    const { id } = request;
    try {
      const poll = await this.getPollByIdUseCase.execute({ id });
      return ok({ poll })
    } catch (error: any) {
      return serverError(error);
    }
  }
}
