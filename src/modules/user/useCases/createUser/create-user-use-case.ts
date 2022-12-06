import { UsersRepository } from "../../repositories/users-repository";
import * as jwt from '../../../../ports/adapters/jwt';

import { z } from "zod";

type Request = {
  access_token: string;
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(request: Request) {
    const createUserBody = z.object({
      access_token: z.string(),
    });

    const { access_token } = createUserBody.parse(request);

    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const { email, id, name, picture } = userInfoSchema.parse(userData);

    let user = await this.usersRepository.findByGoogleId(id);
    if (!user) {
      user = await this.usersRepository.create({
        email,
        googleId: id,
        name,
        avatarUrl: picture,
      });
    }

    const token = await jwt.generateToken({
      name: user.name,
      avatarUrl: user.avatarUrl,
      id: user.id,
    });

    return token;
  }
}