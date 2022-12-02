import { Game } from '../../game/entities/game';
import { Participant } from '../entities/participant';
import { User } from '../../user/entities/user';

export type ReturnPaticipantByPollId = (Participant & {
  user: User;
  guesses: {
    firstTeamPoints: number;
    secondTeamPoints: number;
    game: Game;
  }[];
});

export type CreateParticipation = Omit<Participant, 'id'>;

export interface ParticipantsRepository {
  create: ({ userId, pollId }: CreateParticipation) => Promise<void>;
  getParticipantsByPollId: (id: string) => Promise<ReturnPaticipantByPollId[]>;
  getTotalPollsUserJoined: (userId: string) => Promise<number>;
  findParticipantByPollIdAndUserId: (pollId: string, userId: string) => Promise<Participant | null>;
}
