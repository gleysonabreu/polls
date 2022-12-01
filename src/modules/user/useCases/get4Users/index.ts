import { Controller } from "../../../../protocols/controller";
import { UsersRepositoryPrisma } from "../../infra/prisma/repositories/UsersRepositoryPrisma";
import { Get4UsersController } from "./Get4UsersController";
import { Get4UsersUseCase } from "./Get4UsersUseCase";

export const makeGet4UsersController = (): Controller => {
  const usersRepository = new UsersRepositoryPrisma();
  const get4UsersUseCase = new Get4UsersUseCase(usersRepository);
  const controller = new Get4UsersController(get4UsersUseCase);
  return controller;
};
