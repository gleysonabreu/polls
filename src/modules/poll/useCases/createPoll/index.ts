import { PollsRepositoryPrisma } from "../../infra/prisma/repositories/polls-repository-prisma";
import { CreatePollController } from "./create-poll-controller";
import { CreatePollUseCase } from "./create-poll-use-case";

const pollsRepository = new PollsRepositoryPrisma();
const createPollUseCase = new CreatePollUseCase(pollsRepository);
const createPollController = new CreatePollController(createPollUseCase);

export { createPollController };
