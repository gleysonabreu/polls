import { Controller } from "../../../../protocols/controller";
import { UsersRepositoryPrisma } from "../../infra/prisma/repositories/users-repository-prisma";
import { CountUserController } from "./count-user-controller";
import { CountUserUseCase } from "./count-user-use-case";

export const makeCountUserController = (): Controller => {
  const usersRepository = new UsersRepositoryPrisma();
  const countUserUseCase = new CountUserUseCase(usersRepository);
  const controller = new CountUserController(countUserUseCase);
  return controller;
}
