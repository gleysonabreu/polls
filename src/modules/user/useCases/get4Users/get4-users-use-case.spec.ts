import { mockUser } from "../../../../../tests";
import { UsersRepository } from "../../../../modules/user/repositories/users-repository";
import { UsersRepositoryInMemory } from "../../../../modules/user/repositories/users-repository-inmemory";
import { Get4UsersUseCase } from "./get4-users-use-case";

type SutTypes = {
  sut: Get4UsersUseCase;
  usersRepository: UsersRepository;
}

const makeSut = (): SutTypes => {
  const usersRepository = new UsersRepositoryInMemory();
  const sut = new Get4UsersUseCase(usersRepository);

  return { usersRepository, sut };
}

describe('Get 4 Users Use Case', () => {
  it('should be able to get 4 users', async () => {
    const { sut, usersRepository } = makeSut();

    const user = mockUser();
    await usersRepository.create(user);
    await usersRepository.create(user);
    await usersRepository.create(user);
    await usersRepository.create(user);

    const promise = await sut.execute();

    expect(promise.length).toEqual(4);
    expect(promise).toEqual(expect.arrayContaining([expect.objectContaining(user)]));
  });
});
