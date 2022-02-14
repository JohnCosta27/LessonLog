import { Request, Response, NextFunction } from 'express';
import { valueDatatype } from 'routesData/auth.data';
import { registerRequiredBodyTemplate } from 'routesData/auth.data';
import { getMissingBodyError, getWrongDataTypeError } from 'config/messages';

export const createMissingBody = (neededKeys: valueDatatype[]): string[] => {
  let missingBody: string[] = [];
  neededKeys.forEach((item) => {
    if (typeof item.value === 'undefined') {
      missingBody.push(item.key);
    }
  });

  return missingBody;
};

export const createWrongDatatypeBody = (neededKeys: valueDatatype[]): valueDatatype[] => {
  const wrongDatatypeBody: valueDatatype[] = neededKeys.filter(
    (key) => key.datatype != key.actualDatatype
  );

  return wrongDatatypeBody;
};

export const randomString = (size: number): string => {
  let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let characterLength: number = characters.length;
  let randomString: string = '';
  for (let i = 0; i < size; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characterLength));
  }
  return randomString;
};

export const bodyDataValidation = (req: Request, res: Response, next: NextFunction) => {
  let currentRequiredBody: valueDatatype[] = [];
  switch (req.path) {
    case '/register':
      currentRequiredBody = registerRequiredBodyTemplate;
      break;
  }

  let registerRequiredBody: valueDatatype[] = currentRequiredBody.map((item) => {
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
    next();
  }
};
