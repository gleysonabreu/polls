import { PollsRepository } from "../../repositories/polls-repository";
import z from 'zod';
import { ParticipantsRepository } from "../../../participant/repositories/participants-repository";
import { JoinPollDTO } from "../../dtos/join-poll-dto";

export class JoinPollUseCase {
  constructor(
    private pollsRepository: PollsRepository,
    private participantsRepository: ParticipantsRepository
  ) { }

  async execute(request: JoinPollDTO) {
    const joinPollBody = z.object({
      code: z.string(),
      userId: z.string(),
    });

    const { code, userId } = joinPollBody.parse(request);

    const poll = await this.pollsRepository.findPollByCodeWithUserParticipants({ code, userId });
    if (!poll) {
      throw new Error('Poll not found!')
    }

    if (poll.participants.length > 0) {
      throw new Error('You already joined this poll!');
    }

    const pollsUserAlreadyJoin = await this.participantsRepository.getTotalPollsUserJoined(userId);
    if (pollsUserAlreadyJoin > 15) {
      throw new Error('You have reached the maximum poll participation limit.');
    }

    await this.participantsRepository.create({ pollId: poll.id, userId });

    return this.pollsRepository.findById(code);
  }
}
