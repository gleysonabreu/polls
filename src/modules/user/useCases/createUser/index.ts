import { UsersRepositoryPrisma } from "../../infra/prisma/repositories/UsersRepositoryPrisma";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const usersRepository = new UsersRepositoryPrisma();
const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController }
