import { Poll } from "@prisma/client";

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

export interface PollsRepository {
  create: (data: CreatePollProps) => Promise<Poll>;
  countByOwnerId: (id: string) => Promise<number>;
  count: () => Promise<number>;
  findById: (id: string) => Promise<Poll | null>;
  countPollsUser: (userId: string) => Promise<number>;
  getPollsUser: (data: GetPollsUserProps) => Promise<Poll[]>;
}
