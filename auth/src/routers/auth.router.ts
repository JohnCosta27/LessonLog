import express, { Request, Response, Router, NextFunction } from 'express';
import { getMissingBodyError, getEmailError, getWrongDataTypeError } from '../config/messages';
import { createMissingBody, createWrongDatatypeBody, randomString } from '../util/util';
import { sha512 } from 'js-sha512';
import { PASSWORD_SALT_LENGTH } from '../config/constants';
import { PrismaClient, users } from '@prisma/client';

const prisma = new PrismaClient();
const authRouter: Router = express.Router();

export type keyDatatype = {
  key: string;
  datatype: string;
};

export interface valueDatatype extends keyDatatype {
  value: string;
  actualDatatype: any;
}

authRouter.post('/register', async (req: Request, res: Response) => {
  const requiredKeys: keyDatatype[] = [
    {
      key: 'firstname',
      datatype: 'string',
    },
    {
      key: 'surname',
      datatype: 'string',
    },
    {
      key: 'email',
      datatype: 'string',
    },
    {
      key: 'password',
      datatype: 'string',
    },
  ];
  const missingBody: string[] = createMissingBody(requiredKeys, req.body);

  if (missingBody.length != 0) {
    res.status(400).send(getMissingBodyError(missingBody));
  } else {
    const valueDatatype: valueDatatype[] = [];

    requiredKeys.forEach((param) => {
      valueDatatype.push({
        key: param.key,
        value: req.body[param.key],
        datatype: param.datatype,
        actualDatatype: typeof req.body[param.key],
      });
    });

    if (createWrongDatatypeBody(valueDatatype).length != 0) {
      res.status(400).send(getWrongDataTypeError());
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
  }
});

export default authRouter;
