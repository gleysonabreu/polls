import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { CreatePollDTO } from "../../dtos/create-poll-dto";
import { CreatePollUseCase } from "./create-poll-use-case";

export namespace CreatePollController {
  export type Request = CreatePollDTO;
}

export class CreatePollController implements Controller {
  constructor(private createPollUseCase: CreatePollUseCase) { }

  async handle(request: CreatePollController.Request) {
    const { title, userId } = request;
    try {
      const poll = await this.createPollUseCase.execute({ title, userId });
      return ok(poll);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
