import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { CreateUserUseCase } from "./create-user-use-case";

export namespace CreateUserController {
  export type Request = {
    access_token: string;
  }
}

export class CreateUserController implements Controller {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  async handle(request: CreateUserController.Request) {
    const { access_token } = request;
    try {
      const token = await this.createUserUseCase.execute({ access_token });
      return ok({ token });
    } catch (error: any) {
      return serverError(error);
    }
  }
}
