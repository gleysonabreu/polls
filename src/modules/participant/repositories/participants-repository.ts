import { Participant } from "@prisma/client";

export interface ParticipantsRepository {
  getParticipantsByPollId: (id: string) => Promise<Participant[]>;
}
