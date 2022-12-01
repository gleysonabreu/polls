import { ok, serverError } from "../../../../helpers/http-helper";
import { Controller } from "../../../../protocols/controller";
import { GetRankingUseCase } from "./get-ranking-use-case";

export namespace GetRankingController {
  export type Request = {
    id: string;
  }
}

export class GetRankingController implements Controller {
  constructor(private getRankingUseCase: GetRankingUseCase) { }

  async handle(request: GetRankingController.Request) {
    const { id } = request;
    try {
      const ranking = await this.getRankingUseCase.execute({ pollId: id });
      return ok({ ranking });
    } catch (error: any) {
      return serverError(error);
    }
  }
}
