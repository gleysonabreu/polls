import { UsersRepository } from "../../repositories/users-repository";

export class Get4UsersUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute() {
    return this.usersRepository.getHomepage();
  }
}
