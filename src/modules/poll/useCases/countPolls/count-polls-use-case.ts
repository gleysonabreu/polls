import { PollsRepository } from "../../repositories/polls-repository";

export class CountPollsUseCase {
  constructor(private pollsRepository: PollsRepository) { }

  async execute() {
    return this.pollsRepository.count();
  }
}
