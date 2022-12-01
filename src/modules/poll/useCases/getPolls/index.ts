import { Controller } from "../../../../protocols/controller";
import { PollsRepositoryPrisma } from "../../infra/prisma/repositories/polls-repository-prisma";
import { GetPollsController } from "./get-polls-controller";
import { GetPollsUseCase } from "./get-polls-use-case";

export const makeGetPollsController = (): Controller => {
  const pollsRepository = new PollsRepositoryPrisma();
  const getPollsUseCase = new GetPollsUseCase(pollsRepository);
  const controller = new GetPollsController(getPollsUseCase);
  return controller;
};
