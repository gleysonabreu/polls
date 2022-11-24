import { UsersRepositoryPrisma } from "../../infra/prisma/repositories/UsersRepositoryPrisma";
import { Get4UsersController } from "./Get4UsersController";
import { Get4UsersUseCase } from "./Get4UsersUseCase";

const usersRepository = new UsersRepositoryPrisma();
const get4UsersUseCase = new Get4UsersUseCase(usersRepository);
const get4UsersController = new Get4UsersController(get4UsersUseCase);

export { get4UsersController }
