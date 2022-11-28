import { ParticipantsRepositoryPrisma } from "../../../participant/infra/prisma/repositories/participants-repository-prisma";
import { GetRankingController } from "./get-ranking-controller";
import { GetRankingUseCase } from "./get-ranking-use-case";

const participantsRepository = new ParticipantsRepositoryPrisma();
const getRankingUseCase = new GetRankingUseCase(participantsRepository);
const getRankingController = new GetRankingController(getRankingUseCase);

export { getRankingController };
