import { PollsRepositoryPrisma } from "../../infra/prisma/repositories/polls-repository-prisma";
import { GetPollByIdController } from "./get-poll-by-id-controller";
import { GetPollByIdUseCase } from "./get-poll-by-id-use-case";

const pollsRepository = new PollsRepositoryPrisma();
const getPollByIdUseCase = new GetPollByIdUseCase(pollsRepository);
const getPollByIdController = new GetPollByIdController(getPollByIdUseCase);

export { getPollByIdController };
