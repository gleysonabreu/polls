import { Poll } from '../entities/poll';
import { Participant } from '../../participant/entities/participant';

export type CreatePoll = Omit<Poll, 'id' | 'createdAt' | 'ownerId'> & {
  userId: string;
};

export type GetPollsUserPagination = {
  userId: string;
  skip: number;
  take: number;
};

export type GetPollByCode = (Poll & { participants: Participant[] });
export type PollByCodeWithParticipants = {
  code: string;
  userId: string;
}
