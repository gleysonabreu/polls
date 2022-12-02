import { Participant } from '../entities/participant';
import { CreateParticipation, PaticipantByPollId } from './types';

export interface ParticipantsRepository {
  create: ({ userId, pollId }: CreateParticipation) => Promise<void>;
  getParticipantsByPollId: (id: string) => Promise<PaticipantByPollId[]>;
  getTotalPollsUserJoined: (userId: string) => Promise<number>;
  findParticipantByPollIdAndUserId: (pollId: string, userId: string) => Promise<Participant | null>;
}
