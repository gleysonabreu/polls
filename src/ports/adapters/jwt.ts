import * as jwt from '../jwt/fastify';

type ExpirationTime = string;
type PayloadJWT = {
  name: string;
  id: string;
  avatarUrl: string | null;
}


export const generateToken = (...args: [PayloadJWT, ExpirationTime?]) => {
  return jwt.createJWT(...args);
}
