import { CreatePollController } from "../src/modules/poll/useCases/createPoll/create-poll-controller";
import { faker } from "@faker-js/faker";

export const mockPoll = (): CreatePollController.Request => ({
  title: faker.name.fullName(),
  userId: faker.datatype.uuid(),
});
