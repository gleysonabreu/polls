import { faker } from '@faker-js/faker';
import { Poll } from '../entities/poll';
import { PollsRepository } from './polls-repository';
import { CreatePoll, GetPollByCode, GetPollsUserPagination, PollByCodeWithParticipants } from './types';

export class PollsRepositoryInMemory implements PollsRepository {
  private polls: Poll[] = [];

  async count(): Promise<number> {
    return this.polls.length;
  }

  async countByOwnerId(id: string): Promise<number> {
    return this.polls.filter(poll => poll.ownerId === id).length;
  }

  async countPollsUser(userId: string): Promise<number> {
    throw new Error('Implement countPollsUser method.')
  }

  async create(data: CreatePoll): Promise<Poll> {
    const poll = { ...data, ownerId: data.userId, createdAt: new Date(), id: faker.datatype.uuid() }
    this.polls.push(poll);
    return poll;
  }

  async findById(id: string): Promise<Poll | null> {
    throw new Error('Implement findById method.')
  }

  async getPollsUser(data: GetPollsUserPagination): Promise<Poll[]> {
    throw new Error('Implement getPollsUser method.')
  }

  async findPollByCodeWithUserParticipants({ code, userId }: PollByCodeWithParticipants): Promise<GetPollByCode | null> {
    throw new Error('Implement findPollByCodeWithUserParticipants method.')
  }
}
