import { PollsRepository } from "../../repositories/polls-repository";
import z from 'zod';

type GetPollByIdProps = {
  id: string;
}

export class GetPollByIdUseCase {
  constructor(private pollsRepository: PollsRepository) { }

  async execute(request: GetPollByIdProps) {
    const getPollParams = z.object({
      id: z.string(),
    });

    const { id } = getPollParams.parse(request);
    const poll = await this.pollsRepository.findById(id);

    if (!poll) {
      throw new Error('This poll not exists!');
    }

    return poll;
  }
}
