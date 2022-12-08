import { faker } from '@faker-js/faker';

export const mockParticipant = () => ({
  id: faker.datatype.uuid(),
  userId: faker.datatype.uuid(),
  pollId: faker.datatype.uuid(),
});
