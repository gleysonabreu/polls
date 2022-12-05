import { Poll } from '../entities/poll';
import {
  CreatePoll,
  GetPollByCode,
  GetPollsUserPagination,
  PollByCodeWithParticipants
} from './types';

export interface PollsRepository {
  create: (data: CreatePoll) => Promise<Poll>;
  countByOwnerId: (id: string) => Promise<number>;
  count: () => Promise<number>;
  findById: (id: string) => Promise<Poll | null>;
  countPollsUser: (userId: string) => Promise<number>;
  getPollsUser: (data: GetPollsUserPagination) => Promise<Poll[]>;
  findPollByCodeWithUserParticipants: ({ code, userId }: PollByCodeWithParticipants) => Promise<GetPollByCode | null>;
}
