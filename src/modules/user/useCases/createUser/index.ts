import { GoogleProvider } from "providers/auth/providers/google-provider";
import { Controller } from "../../../../protocols/controller";
import { UsersRepositoryPrisma } from "../../infra/prisma/repositories/users-repository-prisma";
import { CreateUserController } from "./create-user-controller";
import { CreateUserUseCase } from "./create-user-use-case";

export const makeCreateUserController = (): Controller => {
  const usersRepository = new UsersRepositoryPrisma();
  const auth = new GoogleProvider();
  const createUserUseCase = new CreateUserUseCase(usersRepository, auth);
  const controller = new CreateUserController(createUserUseCase);
  return controller;
};
