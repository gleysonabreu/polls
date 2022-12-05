import { UsersRepository } from "../../repositories/users-repository";

export class CountUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute() {
    return this.usersRepository.count();
  }
}
