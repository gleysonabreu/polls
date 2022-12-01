import { Controller } from "../../../../protocols/controller";
import { PollsRepositoryPrisma } from "../../infra/prisma/repositories/polls-repository-prisma";
import { CountPollsController } from "./count-polls-controller";
import { CountPollsUseCase } from "./count-polls-use-case";

export const makeCountPollsController = (): Controller => {
  const pollsRepository = new PollsRepositoryPrisma();
  const countPollsUseCase = new CountPollsUseCase(pollsRepository);
  const controller = new CountPollsController(countPollsUseCase);
  return controller;
}
