import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePollUseCase } from "./create-poll-use-case";

export type CreatePollControllerProps = {
  Body: {
    title: string;
  }
}

export class CreatePollController {
  constructor(private createPollUseCase: CreatePollUseCase) { }

  async handle(request: FastifyRequest<CreatePollControllerProps>, reply: FastifyReply) {
    const { title } = request.body;
    const userId = request.user.sub;

    const poll = await this.createPollUseCase.execute({ title, userId });
    return reply.status(201).send(poll);
  }
}
