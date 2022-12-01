import { Controller } from "../../../../protocols/controller";
import { ParticipantsRepositoryPrisma } from "../../../participant/infra/prisma/repositories/participants-repository-prisma";
import { PollsRepositoryPrisma } from "../../infra/prisma/repositories/polls-repository-prisma";
import { JoinPollController } from "./join-poll-controller";
import { JoinPollUseCase } from "./join-poll-use-case";

export const makeJoinPollController = (): Controller => {
  const pollsRepository = new PollsRepositoryPrisma();
  const participantsRepository = new ParticipantsRepositoryPrisma();
  const joinPollUseCase = new JoinPollUseCase(pollsRepository, participantsRepository);
  const controller = new JoinPollController(joinPollUseCase);
  return controller;
};
