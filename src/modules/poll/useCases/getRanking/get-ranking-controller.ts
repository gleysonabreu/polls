import { FastifyReply, FastifyRequest } from "fastify";
import { GetRankingUseCase } from "./get-ranking-use-case";

export type GetRankingControllerProps = {
  Params: {
    id: string;
  }
};

export class GetRankingController {
  constructor(private getRankingUseCase: GetRankingUseCase) { }

  async handle(request: FastifyRequest<GetRankingControllerProps>, _reply: FastifyReply) {
    const { id } = request.params;

    const ranking = await this.getRankingUseCase.execute({ pollId: id });
    return { ranking };
  }
}
