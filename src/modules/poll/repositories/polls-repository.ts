import { Poll } from "@prisma/client";

export type CreatePollProps = {
  title: string;
  code: string;
  userId: string;
}
export interface PollsRepository {
  create: (data: CreatePollProps) => Promise<Poll>;
  countByOwnerId: (id: string) => Promise<number>;
}
