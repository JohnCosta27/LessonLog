import express, { Request, Response, Router } from 'express';
import { getEmailError } from '../config/messages';
import { randomString, bodyDataValidation } from '../util/util';
import { sha512 } from 'js-sha512';
import { PASSWORD_SALT_LENGTH } from '../config/constants';
import { PrismaClient, users } from '@prisma/client';

const prisma = new PrismaClient();
const authRouter: Router = express.Router();

authRouter.post('/register', bodyDataValidation, async (req: Request, res: Response) => {
  const passwordSalt: string = randomString(PASSWORD_SALT_LENGTH);
  const passwordHash: string = sha512(req.body.password + passwordSalt);

  try {
    const createNewUser: users = await prisma.users.create({
      data: {
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.surname,
        password: passwordHash,
        salt: passwordSalt,
      },
    });

    res.status(200).send(createNewUser);
  } catch (error) {
    res.status(400).send(getEmailError());
  }
});

export default authRouter;
