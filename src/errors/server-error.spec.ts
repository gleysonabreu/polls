import { ServerError } from "./server-error";

describe('Server Error', () => {
  it('should be returns an server error', () => {
    const stack = 'This is an error generic!';
    const serverError = new ServerError(stack);

    expect(serverError.stack).toEqual(stack);
    expect(serverError.name).toEqual('ServerError');
    expect(serverError.message).toEqual('Internal server error');
  });
});
