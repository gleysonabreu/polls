import { ServerError } from "../errors/server-error";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { badRequest, forbidden, noContent, ok, serverError, unauthorized } from "./http-helper";

describe('Http Helper', () => {
  it('should be returns bad request 400', () => {
    const error = new Error('bad request');
    const sut = badRequest(error);

    expect(sut.statusCode).toEqual(400);
    expect(sut.body).toEqual(error);
  });

  it('should be returns forbidden 403', () => {
    const error = new Error('forbidden');
    const sut = forbidden(error);

    expect(sut.statusCode).toEqual(403);
    expect(sut.body).toEqual(error);
  });

  it('should be returns unauthorized 401', () => {
    const sut = unauthorized();

    expect(sut.statusCode).toEqual(401);
    expect(sut.body).toBeInstanceOf(UnauthorizedError);
    expect(sut.body.name).toEqual('UnauthorizedError');
  });

  it('should be returns server error', () => {
    const error = new Error('Server error');
    const sut = serverError(error);

    expect(sut.statusCode).toEqual(500);
    expect(sut.body).toBeInstanceOf(ServerError);
    expect(sut.body.stack).toEqual(error.stack);
  });

  it('should be returns server error when stack does not exists', () => {
    const error = new Error('Server error');
    error.stack = undefined;
    const sut = serverError(error);

    expect(sut.statusCode).toEqual(500);
    expect(sut.body).toBeInstanceOf(ServerError);
    expect(sut.body.stack).toEqual('');
  });

  it('should be returns ok response with headers', () => {
    const data = [{ name: 'John Doe', age: 20 }];
    const headers = { total: data.length };
    const sut = ok(data, headers);

    expect(sut.body).toEqual(data);
    expect(sut.headers).toEqual(headers);
    expect(sut.headers).toHaveProperty('total');
    expect(sut.statusCode).toEqual(200);
  });

  it('should be returns ok response with no headers', () => {
    const data = [{ name: 'John Doe', age: 20 }];
    const sut = ok(data);

    expect(sut.body).toEqual(data);
    expect(sut.headers).toBeUndefined();
    expect(sut.statusCode).toEqual(200);
  });

  it('should be return no content response with 204', () => {
    const sut = noContent();

    expect(sut.statusCode).toEqual(204);
    expect(sut.body).toBeNull();
  });
});
