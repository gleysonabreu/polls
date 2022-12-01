import { Controller } from "../../../../protocols/controller";
import { UsersRepositoryPrisma } from "../../infra/prisma/repositories/UsersRepositoryPrisma";
import { CountUserController } from "./CountUserController";
import { CountUserUseCase } from "./CountUserUseCase";

export const makeCountUserController = (): Controller => {
  const usersRepository = new UsersRepositoryPrisma();
  const countUserUseCase = new CountUserUseCase(usersRepository);
  const controller = new CountUserController(countUserUseCase);
  return controller;
}
