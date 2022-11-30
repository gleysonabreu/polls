import { Guess } from "@prisma/client";

export type CreateGuessProps = {
  firstTeamPoints: number;
  secondTeamPoints: number;
  gameId: string;
  participantId: string;
};

export interface GuessesRepository {
  create: (data: CreateGuessProps) => Promise<Guess>;
  findGuessByGameIdAndParticipantId: (gameId: string, participantId: string) => Promise<Guess | null>;
  count: () => Promise<number>;
}
