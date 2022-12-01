import { FastifyReply, FastifyRequest } from "fastify";
import { Controller } from "../../protocols/controller";

export const adaptRoute = (controller: Controller) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
      userId: req.user?.sub,
    };

    const httpResponse = await controller.handle(request);

    const headers = httpResponse.headers;
    if (headers) {
      Object.keys(headers).map(key => {
        const headerValue = headers[key];
        return res.header(key, headerValue);
      });
    };

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.code(httpResponse.statusCode).send(httpResponse.body);
    } else {
      res.code(httpResponse.statusCode).send({
        error: httpResponse.body.message,
      });
    }
  }
}
