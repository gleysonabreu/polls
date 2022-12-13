import { PollsRepository } from "../../repositories/polls-repository";
import z from 'zod';
import { GetPollsDTO } from "../../dtos/get-polls-dto";

export class GetPollsUseCase {
  constructor(private pollsRepository: PollsRepository) { }

  async execute(request: GetPollsDTO) {
    const paginationPollsQuery = z.object({
      page: z.string().optional(),
      perPage: z.string().optional(),
    });

    const bodyUserPolls = z.object({
      userId: z.string().min(1),
    });

    const { page, perPage } = paginationPollsQuery.parse(request);
    const { userId } = bodyUserPolls.parse(request);

    const pageCalc = Number(page || 1) - 1;
    const take = Number(perPage) || 10;
    const skip = pageCalc * take;

    const totalPolls = await this.pollsRepository.countPollsUser(request.userId);
    const polls = await this.pollsRepository.getPollsUser({
      userId,
      take,
      skip
    });

    return { polls, totalPolls };
  }
}
