import { PollsRepositoryPrisma } from "../../infra/prisma/repositories/polls-repository-prisma";
import { CountPollsController } from "./count-polls-controller";
import { CountPollsUseCase } from "./count-polls-use-case";

const pollsRepository = new PollsRepositoryPrisma();
const countPollsUseCase = new CountPollsUseCase(pollsRepository);
const countPollsController = new CountPollsController(countPollsUseCase);

export { countPollsController };
