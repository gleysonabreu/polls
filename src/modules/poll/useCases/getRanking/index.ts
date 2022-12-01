import { Controller } from "../../../../protocols/controller";
import { ParticipantsRepositoryPrisma } from "../../../participant/infra/prisma/repositories/participants-repository-prisma";
import { GetRankingController } from "./get-ranking-controller";
import { GetRankingUseCase } from "./get-ranking-use-case";

export const makeGetRankingController = (): Controller => {
  const participantsRepository = new ParticipantsRepositoryPrisma();
  const getRankingUseCase = new GetRankingUseCase(participantsRepository);
  const controller = new GetRankingController(getRankingUseCase);
  return controller;
}
