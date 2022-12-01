import { app } from "../fastify/server";

type PayloadJWT = {
  name: string;
  avatarUrl: string;
  id: string;
}

export async function createJWT(payload: PayloadJWT, expirationTime: string = '1h') {
  const token = app.jwt.sign({
    name: payload.name,
    avatarUrl: payload.avatarUrl,
  }, {
    sub: payload.id,
    expiresIn: expirationTime,
  });

  return token;
}
