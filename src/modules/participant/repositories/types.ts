import { Game } from '../../game/entities/game';
import { Participant } from '../entities/participant';
import { User } from '../../user/entities/user';

export type PaticipantByPollId = (Participant & {
  user: User;
  guesses: {
    firstTeamPoints: number;
    secondTeamPoints: number;
    game: Game;
  }[];
});

export type CreateParticipation = Participant & {
  id?: string | undefined;
};
