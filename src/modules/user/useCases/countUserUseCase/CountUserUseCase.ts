import { IUsersRepository } from "../../repositories/IUsersRepository";

export class CountUserUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  async execute() {
    return this.usersRepository.count();
  }
}
