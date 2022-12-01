import { Controller } from "../../../../protocols/controller";
import { PollsRepositoryPrisma } from "../../infra/prisma/repositories/polls-repository-prisma";
import { CreatePollController } from "./create-poll-controller";
import { CreatePollUseCase } from "./create-poll-use-case";

export const makeCreatePollController = (): Controller => {
  const pollsRepository = new PollsRepositoryPrisma();
  const createPollUseCase = new CreatePollUseCase(pollsRepository);
  const controller = new CreatePollController(createPollUseCase);
  return controller;
}
