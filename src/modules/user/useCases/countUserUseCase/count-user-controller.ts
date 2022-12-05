import { ok } from "../../../../helpers/http-helper";
import { CountUserUseCase } from "./count-user-use-case";

export namespace CountUserController {
  export type Request = {}
}

export class CountUserController {
  constructor(private countUserUseCase: CountUserUseCase) { }

  async handle(_request: CountUserController.Request) {
    const count = await this.countUserUseCase.execute();

    return ok({ count });
  }
}
