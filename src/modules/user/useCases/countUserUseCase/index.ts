import { UsersRepositoryPrisma } from "../../infra/prisma/repositories/UsersRepositoryPrisma";
import { CountUserController } from "./CountUserController";
import { CountUserUseCase } from "./CountUserUseCase";

const usersRepository = new UsersRepositoryPrisma();
const countUserUseCase = new CountUserUseCase(usersRepository);
const countUserController = new CountUserController(countUserUseCase);

export { countUserController };
