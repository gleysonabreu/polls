import { FastifyReply, FastifyRequest } from "fastify";
import { JoinPollUseCase } from "./join-poll-use-case";

export type JoinPollControllerProps = {
  Body: {
    code: string;
  };
};

export class JoinPollController {
  constructor(private joinPollUseCase: JoinPollUseCase) { }

  async handle(request: FastifyRequest<JoinPollControllerProps>, reply: FastifyReply) {
    const { code } = request.body;

    const poll = await this.joinPollUseCase.execute({
      code,
      userId: request.user.sub,
    });

    return reply.status(201).send(poll);
  }
}
