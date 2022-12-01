import { Controller } from "../../../../protocols/controller";
import { PollsRepositoryPrisma } from "../../infra/prisma/repositories/polls-repository-prisma";
import { GetPollByIdController } from "./get-poll-by-id-controller";
import { GetPollByIdUseCase } from "./get-poll-by-id-use-case";

export const makeGetPollByIdController = (): Controller => {
  const pollsRepository = new PollsRepositoryPrisma();
  const getPollByIdUseCase = new GetPollByIdUseCase(pollsRepository);
  const controller = new GetPollByIdController(getPollByIdUseCase);
  return controller;
};
