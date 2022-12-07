import { faker } from '@faker-js/faker';

export const mockGame = () => {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.soon(),
    firstTeamCountryCode: faker.random.locale(),
    secondTeamCountryCode: faker.random.locale(),
    firstTeamScore: faker.datatype.number(),
    secondTeamScore: faker.datatype.number(),
  }
}
