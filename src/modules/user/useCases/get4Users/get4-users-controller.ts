import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { Get4UsersUseCase } from "./get4-users-use-case";

export namespace Get4UsersController {
  export type Request = {}
}

export class Get4UsersController implements Controller {
  constructor(private get4UsersUseCase: Get4UsersUseCase) { }

  async handle(_request: Get4UsersController.Request) {
    try {
      const users = await this.get4UsersUseCase.execute();
      return ok({ users });
    } catch (error: any) {
      return serverError(error);
    }
  }
}
