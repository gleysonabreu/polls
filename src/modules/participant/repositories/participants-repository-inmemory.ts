import { Participant } from '../entities/participant';
import { ParticipantsRepository } from './participants-repository';
import { CreateParticipation, PaticipantByPollId } from './types';

export class ParticipantsRepositoryInMemory implements ParticipantsRepository {
  private particpants: Participant[] = [];

  async create({ userId, pollId, id }: CreateParticipation): Promise<void> {
    this.particpants.push({ id, userId, pollId });
  };

  async getTotalPollsUserJoined(userId: string): Promise<number> {
    throw new Error();
  };
  async getParticipantsByPollId(_id: string): Promise<PaticipantByPollId[]> {
    return this.particpants as PaticipantByPollId[];
  };
  async findParticipantByPollIdAndUserId(pollId: string, userId: string): Promise<Participant | null> {
    const participant = this.particpants.find(participant => participant.pollId === pollId && participant.userId === userId);

    if (participant) {
      return participant;
    } else {
      return null;
    }
  };
}
