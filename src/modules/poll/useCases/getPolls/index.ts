import { PollsRepositoryPrisma } from "../../infra/prisma/repositories/polls-repository-prisma";
import { GetPollsController } from "./get-polls-controller";
import { GetPollsUseCase } from "./get-polls-use-case";

const pollsRepository = new PollsRepositoryPrisma();
const getPollsUseCase = new GetPollsUseCase(pollsRepository);
const getPollsController = new GetPollsController(getPollsUseCase);

export { getPollsController };
