import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { GetPollsDTO } from "../../dtos/get-polls-dto";
import { GetPollsUseCase } from "./get-polls-use-case";

export namespace GetPollsController {
  export type Request = GetPollsDTO;
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
