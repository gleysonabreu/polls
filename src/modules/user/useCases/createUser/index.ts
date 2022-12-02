import { Controller } from "../../../../protocols/controller";
import { UsersRepositoryPrisma } from "../../infra/prisma/repositories/users-repository-prisma";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

export const makeCreateUserController = (): Controller => {
  const usersRepository = new UsersRepositoryPrisma();
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  const controller = new CreateUserController(createUserUseCase);
  return controller;
};
