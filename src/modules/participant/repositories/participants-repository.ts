import { Game, Participant, User } from "@prisma/client";

export type ReturnPaticipantByPollId = (Participant & {
  user: User;
  guesses: {
    firstTeamPoints: number;
    secondTeamPoints: number;
    game: Game;
  }[];
});

export type CreateParticipation = {
  userId: string;
  pollId: string;
};

export interface ParticipantsRepository {
  create: ({ userId, pollId }: CreateParticipation) => Promise<void>;
  getParticipantsByPollId: (id: string) => Promise<ReturnPaticipantByPollId[]>;
  getTotalPollsUserJoined: (userId: string) => Promise<number>;
  findParticipantByPollIdAndUserId: (pollId: string, userId: string) => Promise<Participant | null>;
}
