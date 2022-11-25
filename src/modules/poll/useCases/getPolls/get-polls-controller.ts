import { FastifyReply, FastifyRequest } from "fastify";
import { GetPollsUseCase } from "./get-polls-use-case";

export type GetPollsControllerProps = {
  Querystring: {
    page?: string;
    perPage?: string;
  }
};

export class GetPollsController {
  constructor(private getPollsUseCase: GetPollsUseCase) { }

  async handle(request: FastifyRequest<GetPollsControllerProps>, reply: FastifyReply) {
    const { page, perPage } = request.query;

    const { totalPolls, polls } = await this.getPollsUseCase.execute({
      userId: request.user.sub,
      page,
      perPage,
    });

    reply.headers({ 'x-total-count': totalPolls });
    return reply.status(200).send({ polls });
  }
}
