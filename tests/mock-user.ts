import { faker } from "@faker-js/faker";

export const mockUser = () => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  googleId: faker.datatype.uuid(),
  name: faker.name.fullName(),
  avatarUrl: faker.image.avatar(),
});
