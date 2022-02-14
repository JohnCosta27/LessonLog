import express, { Request, Response, Router, NextFunction } from 'express';
import { getMissingBodyError, getEmailError, getWrongDataTypeError } from '../config/messages';
import { createMissingBody, createWrongDatatypeBody, randomString } from '../util/util';
import { sha512 } from 'js-sha512';
import { PASSWORD_SALT_LENGTH } from '../config/constants';
import { PrismaClient, users } from '@prisma/client';
import { registerRequiredBodyTemplate, valueDatatype } from '../routesData/auth.data';

const prisma = new PrismaClient();
const authRouter: Router = express.Router();

authRouter.post('/register', async (req: Request, res: Response) => {
  let registerRequiredBody: valueDatatype[] = registerRequiredBodyTemplate.map((item) => {
    return {
      key: item.key,
      datatype: item.datatype,
      value: req.body[item.key],
      actualDatatype: typeof req.body[item.key],
    };
  });

  const bodyValidation: valueDatatype[] = createWrongDatatypeBody(registerRequiredBody);
  const missingBody: string[] = [];

  bodyValidation.forEach((item) => {
    if (typeof item.value === 'undefined') {
      missingBody.push(item.key);
    }
  });

  if (missingBody.length != 0) {
    res.status(400).send(getMissingBodyError(missingBody));
  } else if (bodyValidation.length != 0) {
    res.status(400).send(getWrongDataTypeError(bodyValidation));
  } else {
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
  }
});

export default authRouter;
