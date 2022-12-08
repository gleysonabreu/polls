import { UsersRepository } from "../../../../modules/user/repositories/users-repository";
import { UsersRepositoryInMemory } from "../../../../modules/user/repositories/users-repository-inmemory";
import { CountUserUseCase } from "./count-user-use-case";

type SutTypes = {
  sut: CountUserUseCase;
  usersRepository: UsersRepository;
}

const makeSut = (): SutTypes => {
  const usersRepository = new UsersRepositoryInMemory();
  const sut = new CountUserUseCase(usersRepository);

  return { sut, usersRepository };
}
describe('Count User Use Case', () => {
  it('should be able to get total users', async () => {
    const { sut } = makeSut();
    const promise = await sut.execute();

    expect(promise).toEqual(0);
  });
});
