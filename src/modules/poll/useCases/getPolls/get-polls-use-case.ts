import { PollsRepository } from "../../repositories/polls-repository";
import z from 'zod';

type GetPollsUseCaseProps = {
  page?: string;
  perPage?: string;
  userId: string;
};

export class GetPollsUseCase {
  constructor(private pollsRepository: PollsRepository) { }

  async execute(request: GetPollsUseCaseProps) {
    const paginationPollsQuery = z.object({
      page: z.string().optional(),
      perPage: z.string().optional(),
    });

    const { page, perPage } = paginationPollsQuery.parse(request);

    const pageCalc = Number(page || 1) - 1;
    const take = Number(perPage) || 10;
    const skip = pageCalc * take;

    const totalPolls = await this.pollsRepository.countPollsUser(request.userId);
    const polls = await this.pollsRepository.getPollsUser({
      userId: request.userId,
      take,
      skip
    });

    return { polls, totalPolls };
  }
}
