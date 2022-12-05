import { Controller } from "../../../../protocols/controller";
import { UsersRepositoryPrisma } from "../../infra/prisma/repositories/users-repository-prisma";
import { Get4UsersController } from "./get4-users-controller";
import { Get4UsersUseCase } from "./get4-users-use-case";

export const makeGet4UsersController = (): Controller => {
  const usersRepository = new UsersRepositoryPrisma();
  const get4UsersUseCase = new Get4UsersUseCase(usersRepository);
  const controller = new Get4UsersController(get4UsersUseCase);
  return controller;
};
