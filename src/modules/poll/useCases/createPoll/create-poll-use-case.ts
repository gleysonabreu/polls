import { PollsRepository } from "../../repositories/polls-repository";
import z from 'zod';
import ShortUniqueId from "short-unique-id";
import { CreatePollDTO } from '../../dtos/create-poll-dto';

export class CreatePollUseCase {
  constructor(private pollsRepository: PollsRepository) { }

  async execute(request: CreatePollDTO) {
    const createPoolBody = z.object({
      title: z.string()
    });

    const totalPolls = await this.pollsRepository.countByOwnerId(request.userId);

    if (totalPolls >= 15) {
      throw new Error('You have reached the poll creation limit.');
    }

    const { title } = createPoolBody.parse(request);
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    const poll = await this.pollsRepository.create({
      title,
      code,
      userId: request.userId,
    });

    return poll;
  }
}
