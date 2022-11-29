import { ParticipantsRepositoryPrisma } from "../../../participant/infra/prisma/repositories/participants-repository-prisma";
import { PollsRepositoryPrisma } from "../../infra/prisma/repositories/polls-repository-prisma";
import { JoinPollController } from "./join-poll-controller";
import { JoinPollUseCase } from "./join-poll-use-case";

const pollsRepository = new PollsRepositoryPrisma();
const participantsRepository = new ParticipantsRepositoryPrisma();
const joinPollUseCase = new JoinPollUseCase(pollsRepository, participantsRepository);
const joinPollController = new JoinPollController(joinPollUseCase);

export { joinPollController };
