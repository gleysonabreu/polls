import { IUsersRepository } from "../../repositories/IUsersRepository";

export class Get4UsersUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  async execute() {
    return this.usersRepository.getHomepage();
  }
}
