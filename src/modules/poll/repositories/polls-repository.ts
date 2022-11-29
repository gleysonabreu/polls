import { Participant, Poll } from "@prisma/client";

export type CreatePollProps = {
  title: string;
  code: string;
  userId: string;
}

export type GetPollsUserProps = {
  userId: string;
  skip: number;
  take: number;
};

export type ReturnGetPollByCode = (Poll & { participants: Participant[] });
export type PollByCodeWithParticipants = {
  code: string;
  userId: string;
}

export interface PollsRepository {
  create: (data: CreatePollProps) => Promise<Poll>;
  countByOwnerId: (id: string) => Promise<number>;
  count: () => Promise<number>;
  findById: (id: string) => Promise<Poll | null>;
  countPollsUser: (userId: string) => Promise<number>;
  getPollsUser: (data: GetPollsUserProps) => Promise<Poll[]>;
  findPollByCodeWithUserParticipants: ({ code, userId }: PollByCodeWithParticipants) => Promise<ReturnGetPollByCode | null>;
}
