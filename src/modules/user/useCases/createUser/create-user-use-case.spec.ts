import { faker } from "@faker-js/faker";
import { mockUser } from "../../../../../tests";
import * as jwt from '../../../../ports/adapters/jwt';

import { UsersRepository } from "modules/user/repositories/users-repository";
import { UsersRepositoryInMemory } from "../../../../modules/user/repositories/users-repository-inmemory";
import { Auth } from "../../../../providers/auth/auth";
import { CreateUserUseCase } from "./create-user-use-case";
import { AuthRepositorySpy } from '../../../../../tests';

import { ZodError } from "zod";

type SutTypes = {
  sut: CreateUserUseCase;
  usersRepository: UsersRepository;
  authRepository: Auth;
}

const makeSut = (): SutTypes => {
  const usersRepository = new UsersRepositoryInMemory();
  const authRepository = new AuthRepositorySpy();
  const sut = new CreateUserUseCase(usersRepository, authRepository);

  return { authRepository, usersRepository, sut };
}

describe('Create User Use Case', () => {
  it('should be able to create an user or login user', async () => {
    const { sut, authRepository, usersRepository } = makeSut();

    const access_token = faker.datatype.uuid();
    const token = faker.datatype.uuid();

    const user = mockUser();
    await usersRepository.create(user);

    jest.spyOn(authRepository, 'getUser').mockImplementationOnce(async () => ({
      id: user.googleId,
      email: user.email,
      name: user.name,
      picture: user.avatarUrl,
    }));
    jest.spyOn(jwt, 'generateToken').mockImplementationOnce(() => Promise.resolve(token));

    const promiseToken = await sut.execute({ access_token });
    expect(promiseToken).toEqual(token);
  });

  it('should be able to create an user or login user if there is no user', async () => {
    const { sut, authRepository, usersRepository } = makeSut();

    const access_token = faker.datatype.uuid();
    const token = faker.datatype.uuid();

    const user = mockUser();

    jest.spyOn(authRepository, 'getUser').mockImplementationOnce(async () => ({
      id: user.googleId,
      email: user.email,
      name: user.name,
      picture: user.avatarUrl,
    }));
    jest.spyOn(jwt, 'generateToken').mockImplementationOnce(() => Promise.resolve(token));

    const promiseToken = await sut.execute({ access_token });
    const findUser = await usersRepository.findByGoogleId(user.googleId);

    expect(promiseToken).toEqual(token);
    expect(user).toEqual(expect.objectContaining({
      name: findUser?.name,
      avatarUrl: findUser?.avatarUrl,
      email: findUser?.email,
      googleId: findUser?.googleId,
    }))
  });

  it('should not be able to create a user or login user if there is no google id', async () => {
    const { sut, authRepository } = makeSut();
    const user = mockUser();
    const access_token = faker.datatype.uuid();

    jest.spyOn(authRepository, 'getUser').mockImplementationOnce(async () => ({
      email: user.email,
      name: user.name,
      picture: user.avatarUrl,
    }));

    const promise = sut.execute({ access_token });
    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });

  it('should not be able to create a user or login user if there is no email', async () => {
    const { sut, authRepository } = makeSut();
    const user = mockUser();
    const access_token = faker.datatype.uuid();

    jest.spyOn(authRepository, 'getUser').mockImplementationOnce(async () => ({
      id: user.id,
      name: user.name,
      picture: user.avatarUrl,
    }));

    const promise = sut.execute({ access_token });
    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });

  it('should not be able to create a user or login user if there is no name', async () => {
    const { sut, authRepository } = makeSut();
    const user = mockUser();
    const access_token = faker.datatype.uuid();

    jest.spyOn(authRepository, 'getUser').mockImplementationOnce(async () => ({
      id: user.id,
      email: user.email,
      picture: user.avatarUrl,
    }));

    const promise = sut.execute({ access_token });
    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });

  it('should not be able to create a user or login user if there is no picture', async () => {
    const { sut, authRepository } = makeSut();
    const user = mockUser();
    const access_token = faker.datatype.uuid();

    jest.spyOn(authRepository, 'getUser').mockImplementationOnce(async () => ({
      id: user.id,
      email: user.email,
      name: user.name,
    }));

    const promise = sut.execute({ access_token });

    await expect(promise).rejects.toBeInstanceOf(ZodError);
  });
});
