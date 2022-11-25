import { FastifyReply, FastifyRequest } from "fastify";
import { GetPollByIdUseCase } from "./get-poll-by-id-use-case";

export type GetPollByIdControllerProps = {
  Params: {
    id: string;
  }
}

export class GetPollByIdController {
  constructor(private getPollByIdUseCase: GetPollByIdUseCase) { }

  async handle(request: FastifyRequest<GetPollByIdControllerProps>, _reply: FastifyReply) {
    const { id } = request.params;

    const poll = await this.getPollByIdUseCase.execute({ id });
    return { poll }
  }
}
