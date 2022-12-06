import { UnauthorizedError } from "./unauthorized-error";

describe('Unauthorized Error', () => {
  it('should be returns an unauthorized error', () => {
    const unauthorizedError = new UnauthorizedError();

    expect(unauthorizedError.name).toEqual('UnauthorizedError');
    expect(unauthorizedError.message).toEqual('Unauthorized');
  })
});
