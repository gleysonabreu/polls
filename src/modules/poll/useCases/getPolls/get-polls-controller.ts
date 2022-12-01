import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { GetPollsUseCase } from "./get-polls-use-case";

export namespace GetPollsController {
  export type Request = {
    page?: string;
    perPage?: string;
    userId: string;
  }
}

export class GetPollsController implements Controller {
  constructor(private getPollsUseCase: GetPollsUseCase) { }

  async handle(request: GetPollsController.Request) {
    const { page, perPage, userId } = request;

    try {
      const { totalPolls, polls } = await this.getPollsUseCase.execute({
        userId,
        page,
        perPage,
      });

      const headers = {
        'x-total-count': totalPolls
      }
      return ok({ polls }, headers);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
