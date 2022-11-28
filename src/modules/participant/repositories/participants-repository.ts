import { Game, Participant, User } from "@prisma/client";

export type ReturnPaticipantByPollId = (Participant & {
  user: User;
  guesses: {
    firstTeamPoints: number;
    secondTeamPoints: number;
    game: Game;
  }[];
});

export interface ParticipantsRepository {
  getParticipantsByPollId: (id: string) => Promise<ReturnPaticipantByPollId[]>;
}
